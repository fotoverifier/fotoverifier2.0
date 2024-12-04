from django.urls import path
from .views import ProcessExifCheckView, ProcessReverseImageSearchView, ProcessJpegGhostView, ProcessSuperResolutionView, ProcessRecognizeObjectsView, ProcessQuickScanView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('exif-check/', ProcessExifCheckView.as_view(), name='process-exif-check'),
    path('reverse-image-search/', ProcessReverseImageSearchView.as_view(), name='process-reverse-image-search'),
    path('jpeg-ghost/', ProcessJpegGhostView.as_view(), name='process-jpeg-ghost'),
    path('super-resolution/', ProcessSuperResolutionView.as_view(), name='process-super-resolution'),
    path('recognize-objects/', ProcessRecognizeObjectsView.as_view(), name='process-recognize-objects'),
    path('quick-scan/', ProcessQuickScanView.as_view(), name='process-quick-scan'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)