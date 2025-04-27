# from PIL import Image
# import io
# import logging
# import asyncio
# import httpx
# from bs4 import BeautifulSoup

# logger = logging.getLogger(__name__)

# async def reverse_image_search(image_bytes: bytes):
#     try:
#         # Resize the image before uploading (different resolutions for testing)
#         image = Image.open(io.BytesIO(image_bytes))

#         # Try resizing to different common resolutions
#         resolutions = [(600, 600), (1024, 1024), (1200, 900)]
#         for resolution in resolutions:
#             image_resized = image.resize(resolution)
            
#             # Save the image as PNG for different file type
#             img_byte_arr = io.BytesIO()
#             image_resized.save(img_byte_arr, format='PNG')
#             resized_image_bytes = img_byte_arr.getvalue()

#             # Check resized image size
#             resized_size = len(resized_image_bytes)
#             logger.info(f"Resized image size: {resized_size / 1024:.2f} KB")

#             if resized_size < 20 * 1024 or resized_size > 5 * 1024 * 1024:
#                 logger.error("Resized image size is not within the acceptable range (20KB to 5MB)")
#                 continue  # Try with the next resolution

#             upload_api = "https://yandex.com/images-apphost/image-download"
#             headers = {
#                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
#             }

#             async with httpx.AsyncClient(timeout=30) as client:
#                 # Step 1: Upload resized image bytes
#                 files = {
#                     'upfile': ('image.png', resized_image_bytes, 'image/png')
#                 }
#                 params = {
#                     "cbird": "111",  # Ensure this is valid for Yandex
#                     "rpt": "imageview"
#                 }
#                 response = await client.post(upload_api, params=params, files=files, headers=headers)

#                 if response.status_code != 200:
#                     logger.error(f"Yandex responded with {response.status_code} - {response.text}")
#                     continue  # Try the next resolution

#                 upload_data = response.json()

#                 if "image_shard" not in upload_data or "image_id" not in upload_data:
#                     logger.error("Yandex upload response missing expected fields")
#                     continue  # Try with the next resolution

#                 image_shard = upload_data["image_shard"]
#                 image_id = upload_data["image_id"]

#                 # Step 2: Construct result URL
#                 result_url = f"https://yandex.com/images/search?rpt=imageview&cbir_id={image_shard}/{image_id}"

#                 logger.info(f"Yandex search result URL: {result_url}")

#                 # Step 3: Fetch results page and extract similar links
#                 search_response = await client.get(result_url, headers=headers)
#                 search_response.raise_for_status()

#                 soup = BeautifulSoup(search_response.text, 'html.parser')

#                 similar_links = []
#                 for a in soup.select("a.Link")[:5]:
#                     href = a.get("href")
#                     if href and href.startswith("http"):
#                         similar_links.append(href)

#                 return {
#                     "result_url": result_url,
#                     "similar_links": similar_links
#                 }

#         # If we reach here, it means no resolution worked, return error
#         return {"error": "Yandex reverse image search failed with status 400 - Avatar size issue"}

#     except Exception as e:
#         logger.error("Yandex reverse image search failed", exc_info=True)
#         return {"error": f"Yandex reverse image search failed: {str(e)}"}
