from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name="api-overview"),
    path('bird-list/', views.bird_list, name="bird-list"),
    path('bird-details/<str:name>', views.bird_details, name="bird-details"),
    path('bird-audio-details/<str:name>', views.bird_audio_details, name="bird-audio-details"),
    path('bird-oscillogram/<str:name>', views.bird_oscillogram, name="bird-oscillogram"),
    path('bird-fourier-transform/<str:name>', views.bird_fourier_transform, name="bird-fourier-transform"),
    path('bird-spectrogram/<str:name>', views.bird_spectrogram, name="bird-spectrogram"),
]
