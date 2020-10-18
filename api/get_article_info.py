# Retrieve news article url and returns info about article.
# Title, Summary, Keywords
from newsfetch.news import newspaper
from summa import summarizer

#article = "https://www.cnn.com/2020/10/17/health/us-coronavirus-saturday/index.html"


# Returns title of article with URL
def get_title(url):
    return newspaper(url).headline


# Returns list of keywords with URL
def get_keywords(url, queue):
    news = newspaper(url)
    queue.put(news.keywords)
    # return news.keywords


# Returns summary of article (100 CHAR) with article text.
def summarize(url, queue):
    news = newspaper(url)
    queue.put(summarizer.summarize(news.article, words=100))
    # return summarizer.summarize(news.article, words=100)
