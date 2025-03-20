import os
import io
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
from serpapi import GoogleSearch

load_dotenv()

serpapi_secret_key = os.getenv("SERPAPI")
if not serpapi_secret_key:
    raise ValueError("SERPAPI is not set! Check your .env file.")

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("CLOUD_API_KEY"),
    api_secret=os.getenv("CLOUD_API_SECRET")
)

def reverse_image_search(image_stream: io.BytesIO):
    try:
        image_url = cloudinary.uploader.upload(image_stream, folder="reverse_search")["secure_url"]
        
        params = {
            "engine": "google_reverse_image",
            "image_url": image_url,
            "api_key": serpapi_secret_key
        }
        search = GoogleSearch(params)
        results = search.get_dict()
        result = {
            "image_results": results.get("image_results", []),
        }
        print(result)
        return result
    except Exception as e:
        return {"error": str(e)}