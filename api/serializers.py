from rest_framework import serializers
from .models import Bird


class BirdInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bird
        fields = ['common_name', 'scientific_name']


class BirdAudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bird
        fields = ['location', 'call', 'call_number', 'call_types']
