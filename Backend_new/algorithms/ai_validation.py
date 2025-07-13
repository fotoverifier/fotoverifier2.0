from openai import OpenAI
import re
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)

def analyze_images_from_base64_and_url(
    original_base64: str,
    ela_url: str,
    question: str,
    suggestion: str,
    language: str
) -> dict:
    tone_instruction = {
        "professional": "Write in a detsailed and analytical tone suitable for a forensic professional.",
        "casual": "Write in a simplified, accessible tone suitable for casual readers."
    }.get(suggestion, "")

    language_instruction = {
    "EN": "Respond fully in English.",
    "VN": "Translate only the analysis content (text after the dash '-') into Vietnamese. Keep the section headers (👤 Investigator A:, etc.) in English."
    " All summaries and explanations must be written in Vietnamese.",
    "NO": "Translate only the analysis content (text after the dash '-') into Norwegian. Keep the section headers (👤 Investigator A:, etc.) in English."
    " All summaries and explanations must be written in Norwegian.",
    "JP": "Translate only the analysis content (text after the dash '-') into Japanese. Keep the section headers (👤 Investigator A:, etc.) in English."
    " All summaries and explanations must be written in Japanese.",
}.get(language, "Respond fully in English.")

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=0.8,
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
                            "url": f"data:image/jpeg;base64,{original_base64}"
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
    f"{tone_instruction}\n"
    "You are simulating two digital forensic investigators.\n\n"
    "The first image is the original photograph.\n"
    "The second image is the Error Level Analysis (ELA) result.\n\n"
    "Each investigator should independently assess whether the original image has been manipulated, using ELA to guide detection of abnormal compression, edge irregularities, lighting inconsistencies, and semantic anomalies.\n"
    "Zoom in on suspicious regions and report any tampering signs.\n\n"
    f"{'Below is a thumbnail the user provides with the image. Check if the thumbnail is consistent with the image' + question}\n"
    "Each investigator should also assess whether the content has political relevancy (i.e., may influence public opinion, contain symbols, figures, or scenarios with political meaning).\n\n"
    "Additionally, provide contextual intelligence based on the image to answer the following:\n"
    "- **Where? (Location):** Determine the correct geographical context.\n"
    "- **When? (Time):** Establish the accurate timeframe.\n"
    "- **Who? (Entities Involved):** Identify key individuals or groups.\n"
    "- **Why? (Motivation or Intent):** Provide a reasoned explanation of possible intent.\n\n"
    f"{language_instruction}\n\n"
    "**Output format:**\n\n"
    "👤 Investigator A:\n"
    "- Summary: ...\n"
    "- Lighting inconsistencies: ...\n"
    "- Edge artifacts: ...\n"
    "- Semantic anomalies: ...\n"
    "- Political Relevancy: [High/Medium/Low]\n"
    "- Confidence level: [High/Medium/Low]\n"
    "- Where: ...\n"
    "- When: ...\n"
    "- Who: ...\n"
    "- Why: ...\n\n"
    "👤 Investigator B:\n"
    "- Summary: ...\n"
    "- Lighting inconsistencies: ...\n"
    "- Edge artifacts: ...\n"
    "- Semantic anomalies: ...\n"
    "- Political Relevancy: [High/Medium/Low]\n"
    "- Confidence level: [High/Medium/Low]\n"
    "- Where: ...\n"
    "- When: ...\n"
    "- Who: ...\n"
    "- Why: ...\n\n"
    "🧩 Shared Judgment:\n"
    "- Consensus Summary: [Agreed judgment or note of disagreement]\n"
    "- Political Relevancy (agreed): [High/Medium/Low]\n"
    "- Overall Confidence: [High/Medium/Low]\n\n"
    "🗣️ User Question Response:\n"
    "- Relevance: [Relevant/Not relevant]\n"
    "- Response: [Assess the thumbnail analysis, is it aligned with the image or with different intents]"
)
                    }
                ]
            }
        ]
    )

    return completion.choices[0].message.content or ""

def parse_analysis_response(text: str) -> dict:
    def extract_section(label):
        pattern = rf"{label}:\n((?:- .*\n)+)"
        match = re.search(pattern, text)
        if not match:
            return {}
        lines = match.group(1).strip().split('\n')
        return {line.split(":")[0].strip("- ").strip(): line.split(":", 1)[1].strip() for line in lines}

    result = {
        "investigator_A": extract_section("👤 Investigator A"),
        "investigator_B": extract_section("👤 Investigator B"),
        "shared_judgment": extract_section("🧩 Shared Judgment"),
        "user_question_response": extract_section("🗣️ User question Response")
    }

    return result



# json_result = parse_analysis_response(analyze_images_from_base64_and_url(
#     original_base64= image1_base64,
#     ela_url= image2_base64,
#     question="Is the girl weird",
#     suggestion="professional",
#     language="EN"
# ))

# json_output = json.dumps(json_result,ensure_ascii=False, indent=2)
# print(json_output)
