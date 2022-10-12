from django.db import models


class Bird(models.Model):
    short_name = models.CharField(default="", max_length=200)
    common_name = models.CharField(default="", max_length=200)
    scientific_name = models.CharField(default="", max_length=200)
    location = models.CharField(default="", max_length=200)
    call = models.CharField(default="", max_length=500)
    call_types = models.CharField(default="", max_length=200)

    def __str__(self):
        return self.common_name
