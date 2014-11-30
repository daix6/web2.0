'''dostring for main.py'''
import os
import card_check

import tornado.web
import tornado.ioloop
import tornado.options
import tornado.httpserver

from tornado.options import define, options
define("port", default=8888, help="run on the given port", type=int)

class BaseHandler(tornado.web.RequestHandler):
    """docstring for BaseHandler"""
    def post(self):
        name = self.get_argument("name", None)
        section = self.get_argument("section", None)
        number = self.get_argument("number", None)
        card_type = self.get_argument("card_type", None)
        if not name or not section or not number or not card_type:
            self.redirect("/?error=incomplete")
        elif not card_check.valid_card(number, card_type):
            self.redirect("/?error=invalidcard")
        else:
            current_user = {}
            current_user["name"] = name
            current_user["section"] = section
            current_user["number"] = number
            current_user["card_type"] = card_type
            file_object = open(os.path.join(os.path.dirname(__file__), "static/database", "suckers.txt"), 'a')
            file_object.write(name+";"+section+";"+number+";"+card_type+"\n")
            file_object.close()
            file_object = open(os.path.join(os.path.dirname(__file__), "static/database", "suckers.txt"), 'r')
            suckers = file_object.read()
            file_object.close()
            self.render("sucker.html", current_user=current_user, suckers=suckers)

class IndexHandler(BaseHandler):
    """docstring for IndexHandler"""
    def get(self):
        error = self.get_argument("error", None)
        if error == "incomplete":
            self.render("error.html", error_message="You didn't fill out the form completely.")
        elif error == "invalidcard":
            self.render("error.html", error_message="You didn't provide a valid card number.")
        else:
            self.render("buyagrade.html")

if __name__ == '__main__':
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=[(r'/', IndexHandler), (r'/', BaseHandler)],
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        debug=True
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
