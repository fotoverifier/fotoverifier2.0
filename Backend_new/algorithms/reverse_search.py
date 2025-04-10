import requests
from googlelens import GoogleLens
from .utility import upload_to_cloudinary

async def google_lens_search(image_bytes: bytes):
    try:
        # Upload image and get URL
        image_url = upload_to_cloudinary(image_bytes, filename="mrisa_temp")

        # Instantiate GoogleLens
        lens = GoogleLens()

        # If search_by_url is an async method
        # search_result = await lens.search_by_url(image_url)
        # If it is sync (most likely, unless you modified the package)
        search_result = lens.search_by_url(image_url)

        return search_result

    except requests.exceptions.RequestException as e:
        return {"error": f"Request failed: {str(e)}"}

    except Exception as e:
        return {"error": f"Unexpected error: {str(e)}"}