from django.db import models


class Bird(models.Model):
    short_name = models.CharField(default="", max_length=200)
    common_name = models.CharField(default="", max_length=200)
    scientific_name = models.CharField(default="", max_length=200)
    location = models.CharField(default="", max_length=200)
    call = models.CharField(default="", max_length=500)
    call_number = models.IntegerField(default=-1)
    call_types = models.CharField(default="", max_length=200)
    latitude = models.FloatField(default=0)
    longitude = models.FloatField(default=0)

    def __str__(self):
        return self.short_name + "-" + str(self.call_number)
