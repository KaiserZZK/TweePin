# modelload.py
# just make a script which load model and make a function to it

import spacy
import os

model_path = os.path.dirname(os.path.realpath(__file__)) + '/models/street_ner_model_LARGE_v1' # modifed this to your path and check if this is working fine and load correctly

def load_model(path=None):
    if path is None:
          path = model_path

    nlp = spacy.load(path)
    return nlp


# end