from django.db import models
from django.utils.text import slugify
import uuid

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)


class Image(models.Model):
    image = models.ImageField(upload_to=upload_to, blank=False, null=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255, default='Untitled')
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    class Meta:
        ordering = ['-uploaded_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.generate_unique_slug()
        super().save(*args, **kwargs)

    def generate_unique_slug(self):
        base_slug = slugify(self.title)
        unique_slug = base_slug
        while Image.objects.filter(slug=unique_slug).exists():
            unique_slug = f'{base_slug}-{uuid.uuid4().hex[:8]}'
        return unique_slug