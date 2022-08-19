'''
Credits to https://stackoverflow.com/questions/59159024/cannot-find-the-path-of-my-model-in-flask
for helping to figure out how to import custom NER model
'''

from flask import Flask
from flask import request
from flask_cors import CORS

import json
import tweepy
import config
import spacy
import requests
from modelload import load_model

client = tweepy.Client(bearer_token=config.BEARER_TOKEN)

# nlp = spacy.load("home/zekaizhang/mysite/models/street_ner_model_LARGE_v1")

twitter_search = ""
RET_STATUS = " -is:retweet"

nlp = load_model()

BASIC_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="
API_KEY = "&key=AIzaSyAKrBdvNMYWcpOyL7P3_h3gd_UaQeZkOQg"

app = Flask(__name__)
CORS(app)

@app.route('/', methods = ['GET', 'POST'])


def handle_request():

    twitter_search = str(request.args.get('input'))
    query = twitter_search + RET_STATUS

    data_set = []

    for tweet in tweepy.Paginator(client.search_recent_tweets, query=query, max_results=20, expansions=['author_id']).flatten(limit=20):

        tweet_text = tweet.text.replace('\n', '').lower()
        tweet_link = "https://twitter.com/" + str(tweet.author_id) + "/status/" + str(tweet.id)

        print(tweet_link)

        doc = nlp(tweet_text)

        loc_info = ""
        map_search = ""

        if len(doc.ents) != 0:

            print(doc)

            for ent in doc.ents:

                print(ent.text + '   ' + ent.label_)
                info = ent.text
                loc_info +=  info + ' ' + ', '
                map_search = loc_info.replace(' ', '%20').lower()

        loc_info = loc_info[0:-3]
        map_search = map_search[0:-7]
        print(loc_info)
        print(map_search)

        url = BASIC_URL + map_search + API_KEY

        payload={}
        headers = {}

        response = requests.request("GET", url, headers=headers, data=payload)

        i = 0
        words = response.text.split()

        for word in words:

            latitude = None
            longitude = None

            if word == "\"location\"":
                latitude = words[i+5].replace(',', '')
                longitude = words[i+8]
                print("Latitude: " + latitude)
                print("Longitude: " + longitude)
                break

            i += 1

        data_set.append({"tweet": tweet_text, "streets": loc_info, "latitude": latitude, "longitude": longitude, "link": tweet_link})

    json_dump = json.dumps(data_set)

    return json_dump

    # Return json now; modify later for need in Unity










