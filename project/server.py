# -*- coding: utf-8 -*-

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import os.path
import re

from tornado.options import define, options
define("port", default=8888, help="run on the given port", type=int)
    
class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("name")

class LoginHandler(BaseHandler):
    def get(self):
        if self.current_user:
            self.redirect('/')
        else:
            self.render('login.html')

    def post(self):
        name__ = self.get_argument('name', 'None')
        password__ = self.get_argument('password', 'None')
        operator = open('static/data/userData.txt')
        line = operator.readline()
        lines = []
        while line:
            line = line.strip('\r\n')
            lines = line.split(',')
            if name__ == lines[0] and password__ == lines[1]:
                operator.close()
                self.set_secure_cookie("name", self.get_argument("name"))
                self.redirect("/")
            line = operator.readline()
        operator.close()
        self.redirect("/login")

class IndexHandler(BaseHandler):
    def get(self):
        if not self.current_user:
            self.redirect("/login")
        else:
            self.render('index.html', user=self.current_user)

class StartHandler(BaseHandler):
    def get(self):
        if not self.current_user:
            self.redirect("/login")
        else:
            self.render('game.html', user=self.current_user)

class SignupHandler(BaseHandler):
    def get(self):
        if self.current_user:
            self.redirect('/')
        else:
            self.render('signup.html')

    def post(self):
        name__ = self.get_argument('name', 'None')
        password__ = self.get_argument('password', 'None')
        operator = open('static/data/userData.txt')
        line = operator.readline()
        while line:
            line.strip('\r\n')
            lines = line.split(',')
            if name__ == lines[0]:
                operator.close()
                self.redirect("/signup")
            line = operator.readline()
        operator.close()
        writer = open('static/data/userData.txt', 'a')
        writer.write(name__+','+password__+'\r\n')
        writer.close()
        self.set_secure_cookie("name", self.get_argument("name"))
        self.redirect("/")

class LogoutHandler(BaseHandler):
    def get(self):
        logout = self.get_argument("logout", 'None')
        if logout is not 'None':
            self.clear_cookie("name")
            self.redirect("/")

class ContinueHandler(BaseHandler):
    def get(self):
        if not self.current_user:
            self.redirect("/login")
        else:
            while line:
                line.strip('\r\n')
                lines = line.split(',')
                if name__ == lines[0]:
                    break;
                line = operator.readline()
            backdrop = lines[2];
            operator.close()
            self.render('game.html', user=self.current_user, background=backdrop)

if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = tornado.web.Application([
        (r'/', IndexHandler),
        (r'/login', LoginHandler),
        (r'/logout', LogoutHandler),
    (r'/signup', SignupHandler),
    (r'/start', StartHandler),
    (r'/continue', ContinueHandler)
    ], cookie_secret="61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=", 
       template_path=os.path.join(os.path.dirname(__file__), "templates"),
       static_path=os.path.join(os.path.dirname(__file__), "static"),
       debug=True)
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()