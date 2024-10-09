from django.db import models
from cloudinary.models import CloudinaryField
from django.utils.text import slugify

class Image(models.Model):
    image = CloudinaryField('Image',overwrite=True,format="jpg")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255, default='Untitled')
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    class Meta:
        ordering=['-uploaded_at',]

    def save(self, *args, **kwargs):
        to_assign=slugify(self.title)

        if Image.objects.filter(slug=to_assign).exists():
            to_assign=to_assign+str(Image.objects.all().count())
        self.slug=to_assign
        super().save(*args, **kwargs)


