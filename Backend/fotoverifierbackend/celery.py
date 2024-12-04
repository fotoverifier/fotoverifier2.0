from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fotoverifierbackend.settings')

app = Celery('fotoverifierbackend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# Set the pool to 'solo' for Windows
app.conf.worker_pool = 'solo'