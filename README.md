# Notes
- Please visit this [repository](https://github.com/KaiserZZK/urban-NER) for the custom NLP model that powers the back-end of this project!
- Most recent update: 19th August 2022, beta 3.0–for [Twitter's Chirp Development Challenge submission](https://devpost.com/software/urban-alert-for-extreme-weathers). 

## Inspiration

It is raining heavily in the city; you saw a flash flooding in the in Freedom Pl and West 66th Street and tweeted about it, wanting to alert others to they could avoid the area. 

However, the warning was soon buried in a sea of tweets, many of which do NOT contain location-specific information like yours; in addition, people outside of the Twitter experience lack access to such valuable life-saving information, and they could not really contribute to the discussion by posting what they see.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Flash flooding in NYC Freedom Pl and w66st. ⁦<a href="https://twitter.com/PIX11News?ref_src=twsrc%5Etfw">@PIX11News</a>⁩ ⁦<a href="https://twitter.com/PIXNEWSDOUG?ref_src=twsrc%5Etfw">@PIXNEWSDOUG</a>⁩ ⁦<a href="https://twitter.com/AvaPittmanTV?ref_src=twsrc%5Etfw">@AvaPittmanTV</a>⁩ ⁦<a href="https://twitter.com/NewsNation?ref_src=twsrc%5Etfw">@NewsNation</a>⁩ <a href="https://t.co/1WZim9fkdz">pic.twitter.com/1WZim9fkdz</a></p>&mdash; Kenneth Evseroff ANCHOR, New To The Street (@NYNEWSGUY) <a href="https://twitter.com/NYNEWSGUY/status/1549126031075954690?ref_src=twsrc%5Etfw">July 18, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

[Link to the tweet](https://twitter.com/NYNEWSGUY/status/1549126031075954690)

This is just one of the many cases where such valuable information could be better consolidated and presented to serve public good. 

In late July last year, when Zhengzhou (Henan, China) was struck by heavy flooding, many people resorted to Weibo for spreading location-specific warning messages or posting distress signals. During that time, me and hundreds of fellow volunteers spent 5 sleepless nights consolidating such information from social media into online spreadsheets. Same year in August when I moved to NYC for college, Hurricane Ida flooded the city, and floodings occur frequently whenever there is a heavy raining. Through those experiences, I came to realize the importance of having a tool that assists the *gathering*, *organizing*, and *verification* of information during public emergencies.

With help from Twitter API v2 and other tools, I present ***TweePin***, a platform that leverages Twitter data to gather, organize, and facilitate discussion around life-saving information during extreme weathers. When you tweet, TweePin automatically helps you add a Pin to an online map to more effectively spread the alert. Ultimately, I hope TweePin could encourage people, both within and outside the Twitter experience, to more actively contribute to the information sharing during times of public emergencies.


## What it does
The current product is a web application that does the following:
1. Users **define the center of the map** by searching for a location of interest, which could either be their current location of a destination they wish to reach. 
2. Users search for a weather event, e.g. *"NYC flooding"*, the keywords are passed into a **custom API** that:
    1. returns all the tweets containing the weather event keyword;
    2. identifies, using Natural Language Processing, whether the tweet contains location-specific information, and extract the information if existing (due to time constraints, the current model only recognizes street names like "West 116th Street", "Broadway", etc.);
    3. returns the coordinates of the location mentioned in the post, based on the extracted information mentioned in the previous step.
3. The filtered tweets will then be rendered on a **2D map**, right at the location they mentioned; e.g. a tweet mentioning *"116th street and broadway"* will be represented as a ***Pin*** placed at the said location.
4. Users could **interact with each Pin** by: 
    1. single-clicking on the icon to view curcial information like the specific location (intersection of roads), a textual description of the issue (extracted text from the original tweet), and a link to the original tweet;
    2. double-clicking on the icon to access the discussion page, on which users, especially non-Twitter users, could contribute to the information-sharing by posting comments about the situation that they see, e.g. *"The water level has gotten lower and it is now safe to walk here."*. The posted comments are uploaded to an online database and are visible to everyone (currently, this feature only supports textual input).


## How we built it
1. Centering the map
    - ***Google Places API*** is used for converting users' textual input of location to coordinates.
2. Custom API
    - Returning tweets: ***Twitter's API v2's Search endpoint*** is used for returning all the tweets that contains the keyword of interest; the API comes in handy when building the query, when I need to rule out the retweets to streamline the information feed.
        - Due to the limitation of my Essential Plan, the search only has access to tweets in the past 7 days, so I have been using self-created tweets for testing purposes. However, even in the case of real events, this should suffice to alert users of the recent situations happening in the past week of the time they search.
    - NLP: ***Twitter's API v2's Search endpoint*** is firstly used for scraping data from Twitter to build the training data set; then, ***Python's spaCy library*** is used for training the custom Named Entity Recognition (NER) model that recognizes street names mentioned in tweets.
        - Here I chose Machine Learning for the recognition instead of checking the text against a dictionary of street names because a) I observed a vareity of expressions for the same street name, e.g. "west 66th street" could be expressed as "w66st"; it is difficult and inefficient to account for all the variations; b) the ML model gives scalability to TweePin: although it is primarily trained based on street names of NYC, with additional training data and iterations it could easily be applied to recognizing streets in other cities as well. 
    - Returning coordinates: ***Google Places API*** is once again used for finding the geo coordinates corresponding to the extracted street intersection
    - Hosting the API: finally, I used the ***Flask-based pythonanywhere.com*** to host my custome API.
3. Visualization on 2D map
    - Placing the Pins: ***HTML, CSS, and JavaScript*** are used for building the web page. ***Google Maps API*** provides the map , and the Pins are created as the ```marker``` objects within the map.
4. User interaction with the Pins
    - Discussion page: ***Firebase*** is used for storing the information contained within each Pin, and all the discussions under the Pins. The content of tweets is used as the unique identifier of each Pin, so that no Pin data gets repeatedly added to the database, and that the discussions are added and accessed correctly.


## Challenges we ran into
- I had a hard time navigating through spaCy; thanks to [Dr. W.J.B. Mattingly](https://www.youtube.com/c/PythonTutorialsforDigitalHumanities/videos)'s wonderful spaCy tutorial series on YouTube, I figured out concepts relevant to training custom NER models, like formatting the dataset and adding pipelines. 
- The map provided by Google Maps API is rendered by the ```initMap()``` function, which creates all the ```marker``` objects that contain the Pins; as such, the code to interact with the Pins is structured differently from the JS methods like ```addEventListener()```. Google Maps API's documentation helped me overcome the challenge.
- Since I used just JavaScript instead of Node.js for scripting, and the existing Firebase documentation is written mainly for web apps built using Node.js, it took me some self-learning and Stack Overflow-ing to get the script to work.


## Accomplishments that we're proud of
- In general, resolving the previously mentioned challenges!
- Planning out the information architecture under the hood, researching how each component could and should be implemented, and eventually building a working product just feels immensely satisfying. My previous experiences were mainly UI/UX design and front-end development, so I learned a lot from building a product with the whole picture in mind.


## What we learned
- Lots of fruitful exploration surrounding leveragin existing APIs, creating my own custom API, and using them as components of the final product; from these experiencs, I will definitely resort to existing tools instead of trying to reinvent the wheel. Thanks to Twitter API for helping me streamlining the back-end structure, otherwise I would have to learn creating my own database, which surely will be challenging and rewarding, but would make the learning curve much steeper and the project period much longer.
- Having a taste of the full flow of scraping and cleaning data, cultivating the training set, and using Machine Learning to train a Natural Language Processing model definitely added to my experience in applied ML and opened up possibilities to more ML-based future projects; exciting!


## What's next for TweePin
- Other input formats on the discussion page: one important update would be to upgrade the discussion section to allow for more than just textual input, but also images and videos. 
- Better location type recognition: it would also be beneficial to train and add more NLP model to the back-end that not just recognizes street names, but also stations, parks, expressway exits, etc.
- Upgrading to Augmented Reality: it might also be more helpful to add an AR view to the map and visualize the Pins in AR, so that users may read the warnings like signs on streets .


### 📍Thank you for your attention, and I hope you like TweePin! Feel free to connect at [zz2919@columbia.edu](mailto:zz2919@columbia.edu) :) 
