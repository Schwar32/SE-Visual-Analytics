
import os
from .models import Bird
import soundfile as sf



def db_setup():
    print("Running")
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
            try:
                data, sample_rate = sf.read(os.getcwd() + "/api/Bird_Calls/" + bird_data.primary_label + "/" + bird_data.filename)
                duration = len(data) / float(sample_rate)
                if duration < 36:
                    bird = Bird()
                    bird.short_name = bird_data.primary_label
                    bird.common_name = bird_data.common_name
                    bird.scientific_name = bird_data.scientific_name

                    location = geolocator.reverse(str(bird_data.latitude) + "," + str(bird_data.longitude))

                    try:
                        address = location.raw['address']
                        country = address.get('country', '')
                        bird.location = country
                    except:
                        bird.location = "unknown"
                        print("error")

                    bird.call = "https://storage.googleapis.com/se-visual-analytics/" \
                                + bird_data.primary_label + "/" + bird_data.filename
                    bird.call_number = index
                    bird.call_types = bird_data.type
                    bird.save()
                    index += 1
            except:
                print("oops")





def file_cleanup():
    df = pd.read_csv('./train_metadata.csv')
    filtered_df = df.loc[(df["secondary_labels"] != "[]") | (df["rating"] < 5)]
    length = len(filtered_df)

    """
    for i in range(length):
        bird_data = filtered_df.iloc[i]
        try:
            os.remove(os.getcwd() + "/Bird_Calls/" + bird_data.primary_label + "/" + bird_data.filename)
        except:
            print("already removed")
    """

    filtered_df = df.loc[(df["secondary_labels"] == "[]") & (df["rating"] >= 5)]
    length = len(filtered_df)
    print(length)
    index = 0
    active_bird = ""

    """
    for i in range(length):
        bird_data = filtered_df.iloc[i]
        if active_bird != bird_data.primary_label:
            active_bird = bird_data.primary_label
            index = 0
        if index >= 5:
            os.remove(os.getcwd() + "/Bird_Calls/" + bird_data.primary_label + "/" + bird_data.filename)
        else:
            data, sample_rate = sf.read(os.getcwd() + "/Bird_Calls/" + bird_data.primary_label + "/" + bird_data.filename)
            duration = len(data) / float(sample_rate)
            if duration >= 36:
                os.remove(os.getcwd() + "/Bird_Calls/" + bird_data.primary_label + "/" + bird_data.filename)
            else:
                index += 1
    """

