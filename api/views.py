from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import BirdSerializer
from .models import Bird

import soundfile as sf
import numpy as np
import plotly_express as px
from scipy.fft import rfft, rfftfreq
import matplotlib.pyplot as plt
import plotly.graph_objects as go
import matplotlib
from urllib.request import urlopen
import io


@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'List': '/bird-list/',
        'Bird Details': '/bird-details/<str:name>'
    }
    return Response(api_urls)


@api_view(['GET'])
def bird_list(request):
    birds = Bird.objects.all()
    serializer = BirdSerializer(birds, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def bird_details(request, name):
    birds = Bird.objects.filter(common_name=name).order_by("pk")[0]
    serializer = BirdSerializer(birds, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def bird_audio_details(request, name):
    bird = Bird.objects.get(common_name=name)
    url = bird.call
    data, sample_rate = sf.read(io.BytesIO(urlopen(url).read()))
    return Response({
        "data": data.tolist(),
        "samplerate": sample_rate
    })


@api_view(['GET'])
def bird_oscillogram(request, name):
    bird = Bird.objects.get(common_name=name)
    url = bird.call
    data, sample_rate = sf.read(io.BytesIO(urlopen(url).read()))

    duration = len(data) / float(sample_rate)

    N = int(np.ceil(sample_rate * duration))
    time = np.linspace(0, duration, N, endpoint=False)

    fig = px.line(x=time[::25], y=data[::25])
    fig.update_layout(
        title='Oscillogram',
        xaxis_title="Time(s.)",
        yaxis_title="Amplitude",
        width=600,
        paper_bgcolor="#000",
        font_color="#fff",
        font_size=14,
        title_x=0.5
    )
    fig.update_traces(line_color='#1c6bb0')
    fig_json = fig.to_json()
    return Response(fig_json)


@api_view(['GET'])
def bird_fourier_transform(request, name):
    bird = Bird.objects.get(common_name=name)
    url = bird.call
    data, sample_rate = sf.read(io.BytesIO(urlopen(url).read()))

    duration = len(data) / float(sample_rate)

    N = int(np.ceil(sample_rate * duration))
    time = np.linspace(0, duration, N, endpoint=False)

    yf = rfft(data)
    xf = rfftfreq(int(N), 1 / sample_rate)

    fig = px.line(x=xf, y=np.abs(yf))
    fig.update_layout(
        title='Fourier Transform',
        xaxis_title="Frequency(Hz.)",
        yaxis_title="Magnitude",
        width=600,
        paper_bgcolor="#000",
        font_color="#fff",
        font_size=14,
        title_x=0.5)

    fig.update_traces(line_color='#1c6bb0')
    fig_json = fig.to_json()
    return Response(fig_json)


@api_view(['GET'])
def bird_spectrogram(request, name):
    matplotlib.use("agg")
    bird = Bird.objects.get(common_name=name)
    url = bird.call
    data, sample_rate = sf.read(io.BytesIO(urlopen(url).read()))

    d, frequency, time, image = plt.specgram(data, Fs=sample_rate)

    d = np.log10(d) #Have to take log10 i dont really know why

    fig = go.Figure(data=go.Heatmap(
        z=d,
        x=time,
        y=frequency,
        colorscale='blues'))
    fig.update_layout(
        title='Spectrogram',
        xaxis_title="Time(s.)",
        yaxis_title="Frequency(Hz.)",
        width=600,
        paper_bgcolor="#000",
        font_color="#fff",
        font_size=14,
        title_x=0.5)

    fig_json = fig.to_json()
    return Response(fig_json)
