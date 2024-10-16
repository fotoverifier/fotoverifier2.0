from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Image
from .serializers import ImageSerializer
import cloudinary.uploader
from algorithms.exif import image_process  # Use absolute import

class ImageUploadView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.validated_data['image']
            upload_data = cloudinary.uploader.upload(image)
            image_instance = serializer.save()
            try:
                exif_data = image_process(image_instance.image.url)  # Use the URL attribute
                if exif_data is None:
                    return Response({"error": "Failed to process image"}, status=status.HTTP_400_BAD_REQUEST)
                return Response({"upload_data": upload_data, "exif_data": exif_data}, status=status.HTTP_201_CREATED)
            except FileNotFoundError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                # Catch any other exceptions and return a 500 error with the exception message
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_queryset(self):
        return Image.objects.all()
