from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

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

#import librosa
#import tensorflow as tf
#import tensorflow_io as tfio
import pandas as pd
#import keras.models
#from sklearn.preprocessing import LabelEncoder


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
    fig.update_traces(line_color='#5ABAFF')
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

    fig.update_traces(line_color='#5ABAFF')
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
            [0, '#0c082a'],
            [0.5, '#0c082a'],
            [0.8, '#2E6185'],
            [.9, '#4285b5'],
            [1, '#5ABAFF'],
        ]))

    fig.update_layout(
        title='Spectrogram',
        xaxis_title="Time(s.)",
        yaxis_title="Frequency(Hz.)",
        )

    fig_json = fig.to_json()
    return Response(fig_json)


def load_encoder():
    label_encoder = LabelEncoder()
    cols = ["filename", "primary_label"]
    df = pd.read_csv("./staticfiles/train_metadata.csv", usecols=cols)
    labels = df.pop('primary_label')
    label_encoder.fit_transform(labels)
    return label_encoder


def load_audio(file_path):
    audio_data, sample_rate = sf.read(file_path.numpy())
    if audio_data.ndim > 1:
        audio_data = np.swapaxes(audio_data, 0, 1)
        audio_data = librosa.to_mono(audio_data)
    audio_data = librosa.resample(audio_data, sample_rate, 32000)
    return audio_data


def preprocess(file_path):
    [wav, ] = tf.py_function(load_audio, [file_path], [tf.float32])
    wav = wav[:480000]
    zero_padding = tf.zeros([480000] - tf.shape(wav), dtype=tf.float32)
    wav = tf.concat([zero_padding, wav], 0)

    spectrogram = tfio.audio.spectrogram(
        wav, nfft=4096, window=4096, stride=int(480000/128) + 1)

    mel_spectrogram = tfio.audio.melscale(
        spectrogram, rate=32000, mels=128, fmin=0, fmax=16000)

    dbscale_mel_spectrogram = tfio.audio.dbscale(
        mel_spectrogram, top_db=80)

    dbscale_mel_spectrogram = tf.expand_dims(dbscale_mel_spectrogram, axis=2)
    dbscale_mel_spectrogram = tf.repeat(dbscale_mel_spectrogram, repeats=3, axis=2)
    dbscale_mel_spectrogram = dbscale_mel_spectrogram / 80
    return dbscale_mel_spectrogram


def make_prediction(model, file_path):
    image = preprocess(file_path)
    image = image.numpy().reshape(1, 128, 128, 3)
    predicted_label = model.predict([image], verbose=False)
    return predicted_label


# Takes in audio file and prints a detailed description of the prediction
def detailed_prediction(model, label_encoder, file_path):
    prediction = make_prediction(model, file_path)[0]
    SHOW_AMOUNT = 5
    max_indexes = np.argpartition(prediction, -SHOW_AMOUNT)[-SHOW_AMOUNT:]
    max_indexes = max_indexes[np.argsort(prediction[max_indexes])]
    max_indexes = np.flip(max_indexes)
    guesses = ""
    for index in range(len(max_indexes)):
        confidence = prediction[max_indexes[index]]
        class_prediction = label_encoder.inverse_transform([max_indexes[index]])
        guesses += (class_prediction + " with " + str(round(confidence * 100, 2)) + "% confidence   ")
    return guesses


@api_view(['GET'])
def predict_call(request):
    model = keras.models.load_model("./staticfiles/model")
    label_encoder = load_encoder()
    test_file = "./staticfiles/XC460987 - American Crow - Corvus brachyrhynchos.mp3"
    guesses = detailed_prediction(model, label_encoder, test_file)
    return Response(guesses)
