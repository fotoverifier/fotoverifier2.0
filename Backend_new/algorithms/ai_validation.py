from openai import OpenAI
import base64
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
  api_key=os.getenv("OPENAI_API_KEY"),
)

def analyze_images_with_urls(original_url: str, ela_url: str) -> str:
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a forensic investigator specializing in detecting inconsistencies in images."
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": original_url
                        }
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": ela_url
                        }
                    },
                    {
                        "type": "text",
                        "text": (
                            "You are simulating two digital forensic investigators.\n\n"
                            "The first image is the *original photograph*.\n"
                            "The second image is the *Error Level Analysis (ELA)* result.\n\n"
                            "Each investigator should independently assess whether the original image has been manipulated, using ELA to guide detection of abnormal compression, edge irregularities, lighting inconsistencies, and semantic anomalies.\n"
                            "Zoom in on suspicious regions and report any tampering signs.\n\n"
                            "Each should also assess whether the content has *political relevancy* (i.e., may influence public opinion, contain symbols, figures, or scenarios with political meaning).\n\n"
                            "**Output format:**\n\n"
                            "👤 Investigator A:\n"
                            "- Summary: ...\n"
                            "- Lighting inconsistencies: ...\n"
                            "- Edge artifacts: ...\n"
                            "- Semantic anomalies: ...\n"
                            "- Political Relevancy: [High/Medium/Low]\n"
                            "- Confidence level: [High/Medium/Low]\n\n"
                            "👤 Investigator B:\n"
                            "- Summary: ...\n"
                            "- Lighting inconsistencies: ...\n"
                            "- Edge artifacts: ...\n"
                            "- Semantic anomalies: ...\n"
                            "- Political Relevancy: [High/Medium/Low]\n"
                            "- Confidence level: [High/Medium/Low]\n\n"
                            "**🧩 Shared Judgment:**\n"
                            "- Consensus Summary: [Agreed judgment or note of disagreement]\n"
                            "- Political Relevancy (agreed): [High/Medium/Low]\n"
                            "- Overall Confidence: [High/Medium/Low]"
                        )
                    }
                ]
            }
        ]
    )

    return completion.choices[0].message.content