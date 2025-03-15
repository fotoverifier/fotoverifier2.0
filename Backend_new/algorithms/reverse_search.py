import os
import io
import requests
import cloudinary
import cloudinary.uploader
import dotenv
from serpapi import GoogleSearch

dotenv.load_dotenv()

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
            "api_key": os.environ.get('SERPAPI_SECRET_KEY')
        }
        search = GoogleSearch(params)
        results = search.get_dict()
        result = {
            "image_results": results.get("image_results", []),
        }
        return result
    except Exception as e:
        return {"error": str(e)}