##What it does
Users search for a weather event, e.g. *"NYC flooding"*, the keywords are passed into this **custom API** that:
1. returns all the tweets containing the weather event keyword;
2. identifies, using Natural Language Processing, whether the tweet contains location-specific information, and extract the information if existing (due to time constraints, the current model only recognizes street names like "West 116th Street", "Broadway", etc.);
3. returns the coordinates of the location mentioned in the post, based on the extracted information mentioned in the previous step.

##How it is built
Custom API
- Returning tweets: ***Twitter's API v2's Search endpoint*** is used for returning all the tweets that contains the keyword of interest; the API comes in handy when building the query, when I need to rule out the retweets to streamline the information feed.
    - Due to the limitation of my Essential Plan, the search only has access to tweets in the past 7 days, so I have been using self-created tweets for testing purposes. However, even in the case of real events, this should suffice to alert users of the recent situations happening in the past week of the time they search.
- NLP: ***Twitter's API v2's Search endpoint*** is firstly used for scraping data from Twitter to build the training data set; then, ***Python's spaCy library*** is used for training the custom Named Entity Recognition (NER) model that recognizes street names mentioned in tweets.
    - Here I chose Machine Learning for the recognition instead of checking the text against a dictionary of street names because a) I observed a vareity of expressions for the same street name, e.g. "west 66th street" could be expressed as "w66st"; it is difficult and inefficient to account for all the variations; b) the ML model gives scalability to TweePin: although it is primarily trained based on street names of NYC, with additional training data and iterations it could easily be applied to recognizing streets in other cities as well. 
- Returning coordinates: ***Google Places API*** is once again used for finding the geo coordinates corresponding to the extracted street intersection
- Hosting the API: finally, I used the ***Flask-based pythonanywhere.com*** to host my custome API.
