from flask import Flask, request
from classify import make_prediction
from get_article_info import get_title, get_keywords, summarize
import json
import time
from multiprocessing import Process, Queue
from urllib.parse import unquote
app = Flask(name)


@app.route('/clickbait/')
def isClickbait():
    url = request.args.get('url')
    queue = Queue()
    title = get_title(url)
    start_time = time.time()
    p1 = Process(target=make_prediction, args=(title, queue))
    p1.start()
    p2 = Process(target=get_keywords, args=(url, queue))
    p2.start()
    p3 = Process(target=summarize, args=(url, queue))
    p3.start()
    p1.join()
    p2.join()
    p3.join()
    res = [title]
    for i in range(3):
        val = queue.get()
        if i == 0:
            val = int(val)
        res.append(val)
    print("--- %s seconds ---" % (time.time() - start_time))
    return json.dumps(res)
