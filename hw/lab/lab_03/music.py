import os.path
import random

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web


from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)

class item:
    def __init__(self, name, filetype, bsize, size):
        self.name = name
        self.filetype = filetype
        self.bsize = bsize
        if size < 1024:
            self.size = "%d b" % size
        elif size < 1024*1024:
            size = float(size)
            self.size = "%.2f kb" % round(size/1024, 2)
        else:
            size = float(size)
            self.size = "%.2f mb" % round(size/1024/1024, 2)


class MusicHandler(tornado.web.RequestHandler):
    def get(self):
        files = os.listdir('static/songs')
        filepath = os.path.join(os.path.dirname(__file__), 'static/songs')
        musiclist = []

        playlist = self.get_argument('playlist', 'None')
        if playlist is not 'None':
            files = open(os.path.join(filepath, playlist)).read().splitlines()

        for f in files:
            musiclist.append(item(
                f,
                os.path.splitext(f)[1][1:],
                os.path.getsize(os.path.join(filepath, f)),
                os.path.getsize(os.path.join(filepath, f))
                                  )
                            )
        bysize = self.get_argument('bysize', 'None')
        if bysize is not 'None':
            musiclist.sort(key=lambda x:(x.bsize), reverse=True)

        shuffle = self.get_argument('shuffle', 'None')
        if shuffle is not 'None':
            random.shuffle(musiclist)

        self.render(
			"music.html",
            musiclist=musiclist
		)



if __name__ == '__main__':
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=[(r"/", MusicHandler)],
        template_path=os.path.join(os.path.dirname(__file__), "template"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        debug=True
    )

    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
