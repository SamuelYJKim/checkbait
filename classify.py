# import module
import nltk
import string as s
import sklearn
import numpy as np
import pickle
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
tfidf = TfidfVectorizer()


def lowercasing(lst):
    new_lst = []
    for i in lst:
        i = i.lower()
        new_lst.append(i)
    return new_lst


def remove_punctuations(lst):
    new_lst = []
    for i in lst:
        for j in s.punctuation:
            i = i.replace(j, '')
        new_lst.append(i)
    return new_lst


def remove_numbers(lst):
    nodig_lst = []
    new_lst = []
    for i in lst:
        for j in s.digits:
            i = i.replace(j, '')
        nodig_lst.append(i)
    for i in nodig_lst:
        if i != '':
            new_lst.append(i)
    return new_lst


def remove_stopwords(lst):
    stop = stopwords.words('english')
    new_lst = []
    for i in lst:
        if i not in stop:
            new_lst.append(i)
    return new_lst


def remove_spaces(lst):
    new_lst = []
    for i in lst:
        i = i.strip()
        new_lst.append(i)
    return new_lst


lemmatizer = nltk.stem.WordNetLemmatizer()


def lemmatzation(lst):
    new_lst = []
    for i in lst:
        i = lemmatizer.lemmatize(i)
        new_lst.append(i)
    return new_lst


def func(x): return ''.join(i+' ' for i in x)


def format_text(text):
    text = text.split()
    text = lowercasing(text)
    text = remove_punctuations(text)
    text = remove_numbers(text)
    text = remove_stopwords(text)
    text = lemmatzation(text)
    text = func(text)
    return text


def make_prediction(text, queue):
    # Sourced heavily using an existing kaggle notebook and model (linked in README)
    # Load the model
    with open('fitted_model.pickle', 'rb') as modelFile:
        model = pickle.load(modelFile)

    text = format_text(text)
    with open('fitted_tfidf.pickle', 'rb') as fileReader:
        tfidf_loaded = pickle.load(fileReader)
    text = [text]
    text = tfidf_loaded.transform(text)

    prediction = model.predict(text)
    queue.put(prediction)
    # return prediction
