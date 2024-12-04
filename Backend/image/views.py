from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from celery.result import AsyncResult
from .serializers import ImageSerializer
from .models import Image
from .tasks import process_exif_check, process_jpeg_ghost, process_reverse_image_search, process_super_resolution, process_recognize_objects, process_quick_scan
from celery import group

class ProcessQuickScanView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            image_instance = serializer.save()
            
            # Trigger quick scan
            process_quick_scan.delay(image_instance.id)
            result = {
                "websocket_url": f"ws://{request.get_host()}/ws/tasks/{image_instance.id}/"
            }
            return Response(result, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ProcessExifCheckView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            image_instance = serializer.save()
            
            # Trigger exif check
            process_exif_check.delay(image_instance.id)

            response_data = {
                "websocket_url": f"ws://{request.get_host()}/ws/tasks/{image_instance.id}/",
            }
            return Response(response_data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProcessReverseImageSearchView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            image_instance = serializer.save()

            #Trigger reverse image search
            process_reverse_image_search.delay(image_instance.id)
            result = {
                "websocket_url": f"ws://{request.get_host()}/ws/tasks/{image_instance.id}/"
            }
            return Response(result, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProcessJpegGhostView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            image_instance = serializer.save()

            #Trigger jpeg ghost
            process_jpeg_ghost.delay(image_instance.id)
            result = {
                "websocket_url": f"ws://{request.get_host()}/ws/tasks/{image_instance.id}/"
            }
            return Response(result, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProcessSuperResolutionView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            image_instance = serializer.save()

            #Trigger super resolution
            process_super_resolution.delay(image_instance.id)
            result = {
                "websocket_url": f"ws://{request.get_host()}/ws/tasks/{image_instance.id}/"
            }
            return Response(result, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProcessRecognizeObjectsView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            image_instance = serializer.save()
            
            process_recognize_objects.delay(image_instance.id)
            result = {
                "websocket_url": f"ws://{request.get_host()}/ws/tasks/{image_instance.id}/"
            }
            return Response(result, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
