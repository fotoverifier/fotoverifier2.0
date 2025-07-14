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
    edge_url:str,
    cfa_url:str,
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
                        "type": "image_url",
                        "image_url": {
                            "url": edge_url,
                        }
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": cfa_url
                        }
                    },
                    {
                        "type": "text",
                        "text": (
    f"{tone_instruction}\n"
    "You are simulating two independent digital forensic investigators.\n"
"The investigation involves four provided images:\n"
"1. The original photograph\n"
"2. The Error Level Analysis (ELA) result\n"
"3. The Canny edge detection result\n"
"4. The Color Filter Array (CFA) analysis result\n\n"

"Each investigator should independently assess whether the original image has been digitally manipulated.\n"
"Use ELA to detect abnormal compression patterns.\n"
"Use the edge map to locate similar or duplicated structures, which may indicate splicing.\n"
"Use CFA analysis to identify inconsistencies in sensor noise patterns or demosaicing artifacts.\n"
"Pay attention to lighting inconsistencies, unnatural edges, and semantic anomalies.\n"
"Zoom in on any suspicious regions and specify their general location (top, bottom, center, left, right).\n\n"

f"This is the user-provided title for the image. Evaluate whether the title is consistent with the visual content: {question}\n\n"

"Each investigator must also assess the image for potential political relevancy:\n"
"- Could the image influence public opinion?\n"
"- Does it include political symbols, figures, or staged events?\n\n"

"Additionally, provide contextual intelligence using visible elements in the image to address:\n"
"- **Where? (Location):** Infer geographical or regional context\n"
"- **When? (Time):** Estimate time period or event\n"
"- **Who? (Entities Involved):** Identify notable individuals, organizations, or symbols\n"
"- **Why? (Motivation or Intent):** Explain the possible purpose or narrative behind the image\n\n"

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
"User Question Response:\n"
"- Relevance: [Relevant/Not relevant]\n"
"- Response: [Assess whether the image supports or contradicts the provided title, and whether it signals alternative intent]"

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
        "user_question_response": extract_section("User Question Response")
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
