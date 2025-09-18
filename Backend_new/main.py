import base64
from fastapi import FastAPI, UploadFile, Form, File, HTTPException, Query, Body
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from algorithms.ai_validation import analyze_images_from_base64_and_url, parse_analysis_response
import asyncio
import json
from tasks import process_quick_scan, process_super_resolution
import redis
import os
from dotenv import load_dotenv
from pydantic import HttpUrl
import httpx
import re

load_dotenv()

image_storage = {}
app = FastAPI()
redis_url = os.getenv("REDIS_URL")
if not redis_url:
    raise ValueError("REDIS_URL is not set! Check your .env file.")
redis_client = redis.from_url(redis_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:9002",
        os.getenv("FRONTEND_URL"),
        ],  # ✅ Change this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # ✅ Allow all headers
)

# @app.get("/")
# async def read_root():
#     return {"message": "Hello World"}

# @app.post("/exif")
# async def get_exif(file: UploadFile = File(...)):
#     try:
#         image_bytes = await file.read()
#         task = process_exif.delay(image_bytes)
#         result = task.get(timeout=10)
#         return result
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

# @app.post("/ela")
# async def get_ela(file: UploadFile = File(...)):
#     try:
#         image_bytes = await file.read()
#         task = process_ela.delay(image_bytes)
#         result = task.get(timeout=20)
#         return result
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"ELA Error: {str(e)}")

# @app.post("/ram")
# async def get_ram(file: UploadFile = File(...)):
#     try:
#         image_bytes = await file.read()
#         task = process_ram.delay(image_bytes)
#         result = task.get(timeout=20)
#         return result
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"RAM Error: {str(e)}")

# @app.post("/jpeg-ghost")
# async def get_jpeg_ghost(file: UploadFile = File(...)):
#     try:
#         image_bytes = await file.read()
#         task = process_jpeg_ghost.delay(image_bytes)
#         result = task.get(timeout=20)
#         return result
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"JPEG Ghost Error: {str(e)}")

# @app.post("/reverse-image-search")
# async def get_reverse_search(file: UploadFile = File(...), query: str = Form(...)):
#     try:
#         image_bytes = await file.read()
#         results = reverse_image_search(image_bytes)
#         return {"results": str(results)}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/super-resolution")
async def get_super_resolution(
    file: UploadFile = File(...),
    scale: int = Query(4, description="Upscale factor (e.g., 2, 4)")
):
    try:
        image_bytes = await file.read()
        task = process_super_resolution.delay(image_bytes, scale)
        return {"message": "Task submitted", "task_id": task.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting task: {str(e)}")

@app.get("/super-resolution-stream")
async def super_resolution_stream(task_id: str, scale: int = 4):
    async def event_stream():
        seen = False

        while True:
            task_meta = redis_client.get(f"celery-task-meta-{task_id}")
            print("task_meta", task_meta)
            if task_meta:
                data = json.loads(task_meta)
                
                print(data)

                if not seen:
                    yield f"data: {json.dumps({'status': data['status']})}\n\n"
                    seen = True

                if data["status"] in ["SUCCESS", "FAILURE"]:
                    result = data["result"]

                    if isinstance(result, dict) and not result["super_resolution"].startswith("Error"):
                        yield f"data: {json.dumps({'status': 'done', 'image_url': result['super_resolution']})}\n\n"
                    else:
                        yield f"data: {json.dumps({'status': 'error', 'detail': str(result)})}\n\n"
                    break

            await asyncio.sleep(1)

    return StreamingResponse(event_stream(), media_type="text/event-stream")

@app.post("/ai-validation")
async def ai_validation(
    original: UploadFile = File(...),
    ela_url: str = Form(...),
    question: str = Form(...),
    suggestion: str = Form(...),
    language: str = Form(...)
):
    try:
        original_bytes = await original.read()
        original_base64 = base64.b64encode(original_bytes).decode("utf-8")

        result = parse_analysis_response(re.sub(r"\*\*", "", analyze_images_from_base64_and_url(
            original_base64=original_base64,
            ela_url=ela_url,
            question=question,
            suggestion=suggestion,
            language=language
        )))
        
        return {"analysis": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing AI validation: {str(e)}")

@app.post("/quick-scan")
async def quick_scan(
    file: UploadFile = File(None), 
    image_url: HttpUrl = Body(default=None)
):
    try:
        if file:
            image_bytes = await file.read()
        elif image_url:
            async with httpx.AsyncClient() as client:
                response = await client.get(str(image_url))
                if response.status_code != 200:
                    raise HTTPException(status_code=400, detail="Failed to fetch image from URL")
                image_bytes = response.content
        else:
            raise HTTPException(status_code=400, detail="No file or image URL provided")
        
        task_id = process_quick_scan.delay(image_bytes).id  # Start parent task
        return {"message": "File uploaded successfully!", "task_id": task_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")
    
@app.get("/quick-scan-stream")
async def quick_scan_stream(task_id: str):
    async def event_stream():
        seen_tasks = set()  # To avoid duplicate streaming

        while True:
            # Get main task result
            main_task_result = redis_client.get(f"celery-task-meta-{task_id}")
            if main_task_result:
                main_task_data = json.loads(main_task_result)

                # Stream main task result
                if task_id not in seen_tasks:
                    yield f"data: {json.dumps(main_task_data)}\n\n"
                    seen_tasks.add(task_id)

                # If main task is finished, check for child tasks
                if main_task_data.get("status") in ["SUCCESS", "FAILURE"]:
                    child_task_ids = redis_client.get(f"task-children-{main_task_data.get('result')}")
                    if child_task_ids:
                        child_task_ids = json.loads(child_task_ids)
                        
                        # Keep polling until all child tasks finish
                        while child_task_ids:
                            pending_tasks = []
                            
                            for child_task_id in child_task_ids:
                                if child_task_id not in seen_tasks:
                                    child_task_result = redis_client.get(f"celery-task-meta-{child_task_id}")
                                    
                                    if child_task_result:
                                        child_task_data = json.loads(child_task_result)
                                        yield f"data: {json.dumps({'task': child_task_id, 'result': child_task_data})}\n\n"
                                        seen_tasks.add(child_task_id)  

                                        # If child task is still running, add to pending list
                                        if child_task_data.get("status") not in ["SUCCESS", "FAILURE"]:
                                            pending_tasks.append(child_task_id)
                                    else:
                                        # If result not found yet, keep it in pending
                                        pending_tasks.append(child_task_id)

                            # Update child_task_ids with only pending tasks
                            child_task_ids = pending_tasks

                            if not child_task_ids:  # All tasks completed
                                break

                            await asyncio.sleep(1)  # Wait before polling again

                    yield f"data: {json.dumps({'status': 'done'})}\n\n"
                    break  # Now exit after all tasks are done

            await asyncio.sleep(1)  # Avoid high CPU usage

    return StreamingResponse(event_stream(), media_type="text/event-stream")
