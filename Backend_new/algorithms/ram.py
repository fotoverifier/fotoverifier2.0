import torch
from PIL import Image
from io import BytesIO
import os
from ram.models import ram_plus
from ram import inference_ram as inference, get_transform

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = None

def load_model():
    global model
    if model is None:
        print("🔄 Loading RAM+ model...")
        model_path = os.path.join("algorithms", "ram_plus_swin_large_14m.pth")
        model = ram_plus(pretrained=model_path, vit='swin_l', image_size=384)
        model.eval().to(device)
        print("✅ Model loaded and ready.")
    return model

def recognize_objects(image_bytes: bytes):
    """Recognizes objects in the uploaded image using a pre-trained model"""
    try:
        image = Image.open(BytesIO(image_bytes))
        model = load_model()
        transform = get_transform(image_size=384)
        input_tensor = transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            result = inference(input_tensor, model)

        return result[0]
    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")
