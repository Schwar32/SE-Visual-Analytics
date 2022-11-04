from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import BirdInfoSerializer
from .serializers import BirdAudioSerializer

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
import ssl


ssl._create_default_https_context = ssl._create_unverified_context


@api_view(['GET'])
def bird_list(request):
    birds = Bird.objects.all().filter(call_number=0)
    bird_names = []
    for i in range(len(birds)):
        bird_names.append(birds[i].common_name)
    return Response(bird_names)


@api_view(['GET'])
def bird_details(request, name):
    birds = Bird.objects.filter(common_name=name).order_by("pk")[0]
    serializer = BirdInfoSerializer(birds, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def bird_audio_files(request, name):
    birds = Bird.objects.all().filter(common_name=name)
    audio_files = []
    for i in range(len(birds)):
        audio_files.append(birds[i].call_number)
    return Response(audio_files)


@api_view(['GET'])
def bird_audio_details(request, name, number):
    bird = Bird.objects.get(common_name=name, call_number=number)
    serializer = BirdAudioSerializer(bird, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def bird_oscillogram(request, name, number):
    bird = Bird.objects.get(common_name=name, call_number=number)
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
    )
    fig.update_traces(line_color='#503d5c')
    fig_json = fig.to_json()
    return Response(fig_json)


@api_view(['GET'])
def bird_fourier_transform(request, name, number):
    bird = Bird.objects.get(common_name=name, call_number=number)
    url = bird.call
    data, sample_rate = sf.read(io.BytesIO(urlopen(url).read()))

    duration = len(data) / float(sample_rate)

    N = int(np.ceil(sample_rate * duration))

    yf = rfft(data)
    xf = rfftfreq(int(N), 1 / sample_rate)

    fig = px.line(x=xf, y=np.abs(yf))
    fig.update_layout(
        title='Fourier Transform',
        xaxis_title="Frequency(Hz.)",
        yaxis_title="Magnitude",
       )

    fig.update_traces(line_color='#503d5c')
    fig_json = fig.to_json()
    return Response(fig_json)


@api_view(['GET'])
def bird_spectrogram(request, name, number):
    matplotlib.use("agg")
    bird = Bird.objects.get(common_name=name, call_number=number)
    url = bird.call

    data, sample_rate = sf.read(io.BytesIO(urlopen(url).read()))

    d, frequency, time, image = plt.specgram(data, Fs=sample_rate)

    with np.errstate(divide='ignore', invalid='ignore'):
        d = np.log10(d)     # Have to take log10 I don't really know why

    fig = go.Figure(data=go.Heatmap(
        z=d,
        x=time,
        y=frequency,
        colorscale=[
            [0, 'rgb(0, 0, 0)'],
            [0.5, 'rgb(0, 0, 0)'],
            [0.8, '#b1aab3'],
            [.9, '#8b7991'],
            [1, '#503d5c'],
        ]))

    fig.update_layout(
        title='Spectrogram',
        xaxis_title="Time(s.)",
        yaxis_title="Frequency(Hz.)",
        )

    fig_json = fig.to_json()
    return Response(fig_json)
