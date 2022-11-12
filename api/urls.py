from django.urls import path
from . import views
from django.views.decorators.cache import cache_page

urlpatterns = [
    path('bird-list/', views.bird_list, name="bird-list"),
    path('bird-details/<str:name>', views.bird_details, name="bird-details"),
    path('bird-audio-files/<str:name>', views.bird_audio_files, name="bird-audio-files"),
    path('bird-audio-details/<str:name>/<str:number>', views.bird_audio_details, name="bird-audio-details"),
    path('bird-oscillogram/<str:name>/<str:number>', views.bird_oscillogram, name="bird-oscillogram"),
    path('bird-fourier-transform/<str:name>/<str:number>', views.bird_fourier_transform, name="bird-fourier-transform"),
    path('bird-spectrogram/<str:name>/<str:number>', views.bird_spectrogram, name="bird-spectrogram"),
    path('bird-predict-call', views.predict_call, name="bird-predict-call"),
]
