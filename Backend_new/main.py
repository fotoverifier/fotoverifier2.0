from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from concurrent.futures import ProcessPoolExecutor
from algorithms.exif import exif_check
from algorithms.ela import ela
from algorithms.ram import recognize_objects
from algorithms.jpeg_ghost import jpeg_ghost
from algorithms.reverse_search import reverse_image_search
import io
import asyncio
import json
from tasks import process_quick_scan
import redis
import os
from dotenv import load_dotenv

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
        "http://localhost:9000",
        os.getenv("FRONTEND_URL"),
        ],  # ✅ Change this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # ✅ Allow all headers
)

@app.get("/")
async def read_root():
    return {"message": "Hello World"}

@app.post("/exif")
async def get_exif(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        exif_data = exif_check(image_bytes)
        return {"filename": file.filename, "exif_data": exif_data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")

@app.post("/ela")
async def get_ela(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        file_stream = io.BytesIO(image_bytes)
        ela_result = ela(file_stream)  # Call the imported ela function
        if ela_result is None:
            raise HTTPException(status_code=500, detail="Failed to process image")
        return {"ela_image": ela_result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing ELA: {str(e)}")

@app.post("/ram")
async def get_ram(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        result = recognize_objects(image_bytes)
        return {"recognized_objects": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/jpeg-ghost")
async def get_jpeg_ghost(file: UploadFile = File(...)):
    try:
        file_bytes = await file.read()
        file_stream = io.BytesIO(file_bytes)
        image_urls = jpeg_ghost(file_stream)    
        return {"images": image_urls}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/reverse-image-search")
async def get_reverse_search(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        file_stream = io.BytesIO(image_bytes)
        search_result = reverse_image_search(file_stream)
        return {"search_result": search_result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/quick-scan")
async def quick_scan(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        task_id = process_quick_scan.delay(image_bytes).id  # Start parent task
        return {"message": "File uploaded successfully!", "task_id": task_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")
    
@app.get("/quick-scan-stream/")
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
