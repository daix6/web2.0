'''I don't know'''
import os
import glob

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options
define("port", default=8888, help="run on the given port", type=int)

class MovieItem(object):
    """docstring for MovieHandler"""
    def __init__(self, filepath):
        (self.name, self.year, self.rate,
         self.count) = open(filepath).read().splitlines()
        self.filename = filepath.split(os.sep)[-2]
    # base info of movie

class ReviewItem(object):
    """docstring for ReviewHandler"""
    def __init__(self, filepath):
        (self.comment, self.forr, self.name,
         self.company) = open(filepath).read().splitlines()
    # base info of review

class IndexHandler(tornado.web.RequestHandler):
    """docstring for IndexHandler"""
    def get(self):
        film = self.get_argument('film')
        filmpath = os.path.join(os.path.dirname(__file__), "static/moviefiles",
                                film)

        dlist_files = open(os.path.join(filmpath,
                           "generaloverview.txt")).read().splitlines()
        dlist = []
        for line in dlist_files:
            sline = line.split(':')
            dlist.append([sline[0], sline[1]])
        # dlist finished
        movie = MovieItem(os.path.join(filmpath, "info.txt"))
        # movie finished
        review_files = glob.glob(os.path.join(filmpath, "review[0-9]*.txt"))
        review_count = len(review_files)
        count = 0
        review_left = []
        review_right = []
        for review_file_path in review_files:
            review = ReviewItem(review_file_path)
            count = count + 1
            if count <= review_count / 2:
                review_left.append(review)
            else:
                review_right.append(review)
        # review finished
        self.render("movie.html", dlist=dlist, review_left=review_left,
                    movie=movie, review_right=review_right, count=review_count)

if __name__ == '__main__':
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=[(r'/', IndexHandler)],
        template_path=os.path.join(os.path.dirname(__file__), "template"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        debug=True
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
