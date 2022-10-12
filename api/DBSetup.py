import pandas as pd
from geopy.geocoders import Nominatim
import os
from .models import Bird


def db_setup():
    geolocator = Nominatim(user_agent="geoapiExercises")

    df = pd.read_csv('./api/train_metadata.csv')
    filtered_df = df.loc[(df["secondary_labels"] == "[]") & (df["rating"] >= 5)]
    active_bird = ""
    index = 0
    length = len(filtered_df)
    print(length)
    for i in range(length):
        bird_data = filtered_df.iloc[i]
        if active_bird != bird_data.primary_label:
            active_bird = bird_data.primary_label
            index = 0
        if index < 5:
            bird = Bird()
            bird.short_name = bird_data.primary_label
            bird.common_name = bird_data.common_name
            bird.scientific_name = bird_data.scientific_name

            location = geolocator.reverse(str(bird_data.latitude) + "," + str(bird_data.longitude))

            try:
                address = location.raw['address']
                bird.location = address.get('country', '')
            except:
                bird.location = "unknown"
                print("error")

            bird.call = "https://storage.googleapis.com/se-visual-analytics/" \
                        + bird_data.primary_label + "/" + bird_data.filename
            bird.call_number = index
            bird.call_types = bird_data.type
            bird.save()
        index += 1


def file_cleanup():
    df = pd.read_csv('./api/train_metadata.csv')
    filtered_df = df.loc[(df["secondary_labels"] == "[]") & (df["rating"] >= 5)]
    length = len(filtered_df)
    index = 0
    active_bird = ""
    for i in range(length):
        bird_data = filtered_df.iloc[i]
        if active_bird != bird_data.primary_label:
            active_bird = bird_data.primary_label
            index = 0
        if index >= 5:
            os.remove(os.getcwd() + "/Bird_Calls/" + bird_data.primary_label + "/" + bird_data.filename)
        index += 1
