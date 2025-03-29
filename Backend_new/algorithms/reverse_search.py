import os
import io
import requests
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
from bs4 import BeautifulSoup


load_dotenv()

serpapi_secret_key = os.getenv("SERPAPI_SECRET_KEY")
if not serpapi_secret_key:
    raise ValueError("SERPAPI is not set! Check your .env file.")

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("CLOUD_API_KEY"),
    api_secret=os.getenv("CLOUD_API_SECRET")
)

YANDEX_SEARCH_URL = "https://yandex.com/images/search"

def reverse_image_search(image_stream: io.BytesIO):
    try:
        image_url = cloudinary.uploader.upload(image_stream, folder="reverse_search")["secure_url"]
        
        # params = {
        #     "engine": "google_reverse_image",
        #     "image_url": image_url,
        #     "api_key": serpapi_secret_key
        # }
        # search = GoogleSearch(params)
        # results = search.get_dict()
        # result = {
        #     "image_results": results.get("image_results", []),
        # }
        # print(result)
        params = {"url": image_url, "rpt": "imageview"}
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        response = requests.get(YANDEX_SEARCH_URL, params=params, headers=headers)
        
        if response.status_code != 200:
            return {"error": "Failed to fetch search results from Yandex."}
        
        with open("yandex_search_results.html", "w", encoding="utf-8") as f:
            f.write(response.text)

        # 3️⃣ Parse HTML để lấy kết quả đầu tiên
        soup = BeautifulSoup(response.text, "html.parser")
        results = []

        for div in soup.find_all("div", class_="CbirSites-ItemInfo"):
            title = div.find("a", class_="Link Link_view_default")
            if title:
                link = title["href"]
                results.append({
                    "title": title.text.strip(),
                    "url": link
                })

        # Nếu không có kết quả nào
        if not results:
            return {"error": "No matching images found."}

        return {"search_results": results}
    except Exception as e:
        return {"error": str(e)}