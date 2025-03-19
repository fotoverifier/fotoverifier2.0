from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from algorithms.exif import exif_check
from algorithms.ela import ela
from algorithms.ram import recognize_objects
from algorithms.jpeg_ghost import jpeg_ghost
from algorithms.reverse_search import reverse_image_search
import io
import asyncio
import json

app = FastAPI()

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
    
async def process_exif(image_bytes):
    try:
        return {"exif_data": exif_check(image_bytes)}
    except Exception as e:
        return {"exif_error": str(e)}

async def process_ela(image_bytes):
    try:
        file_stream = io.BytesIO(image_bytes)
        return {"ela_image": ela(file_stream)}
    except Exception as e:
        return {"ela_error": str(e)}

async def process_ram(image_bytes):
    try:
        return {"recognized_objects": recognize_objects(image_bytes)}
    except Exception as e:
        return {"ram_error": str(e)}

async def process_jpeg_ghost(image_bytes):
    try:
        file_stream = io.BytesIO(image_bytes)
        return {"jpeg_ghost": jpeg_ghost(file_stream)}
    except Exception as e:
        return {"jpeg_ghost_error": str(e)}

async def process_reverse_search(image_bytes):
    try:
        file_stream = io.BytesIO(image_bytes)
        return {"reverse_search": reverse_image_search(file_stream)}
    except Exception as e:
        return {"reverse_search_error": str(e)}
    
async def analyze_all_tasks(image_bytes):
    tasks = [
        process_exif(image_bytes),
        process_ela(image_bytes),
        process_ram(image_bytes),
        process_jpeg_ghost(image_bytes),
        process_reverse_search(image_bytes)
    ]

    for task in asyncio.as_completed(tasks):
        result = await task
        yield (json.dumps(result) + "\n").encode()  # Yield bytes

@app.post("/quick-scan")
async def quick_scan(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        return StreamingResponse(analyze_all_tasks(image_bytes), media_type="text/event-stream")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")