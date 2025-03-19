import torch
from PIL import Image
from io import BytesIO
import os
from ram.models import ram_plus
from ram import inference_ram as inference
from ram import get_transform

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
object_recognition_model = None

def initialize_object_recognition_model():
    """Initialize and cache the object recognition model"""
    global object_recognition_model
    if object_recognition_model is None:
        model_path = os.path.join("algorithms", "ram_plus_swin_large_14m.pth")
        object_recognition_model = ram_plus(pretrained=model_path, vit='swin_l', image_size=384)
        object_recognition_model.eval().to(device)
    return object_recognition_model

def recognize_objects(image_bytes: bytes):
    """Recognizes objects in the uploaded image using a pre-trained model"""
    try:
        image = Image.open(BytesIO(image_bytes))
        model = initialize_object_recognition_model()
        transform = get_transform(image_size=384)
        input_tensor = transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            result = inference(input_tensor, model)

        print(result[0])
        return result[0]
    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")
