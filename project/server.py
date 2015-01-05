# -*- coding: utf-8 -*-

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import os.path
import re

from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)

def check_name(name):
    '''check the name and password'''
    pattern = re.compile(r'([A-Za-z0-9]){6,12}')
    match = pattern.match(name)
    if match:
        return True
    else:
        return False

def check_password(password):
    '''check the password'''
    pattern = re.compile(r'[A-Z]([A-Za-z0-9]){6,12}')
    match = pattern.match(password)
    if match:
        return True
    else:
        return False
class Question(object):
    def __init__(self, title, time, author, text, replys):
        self.author = author
        self.title = title
        self.time = time
        self.text = text
        self.replys = replys

class Reply(object):
    """docstring for Reply"""
    def __init__(self, q_author, time, author, text):
        self.q_author = q_author
        self.time = time
        self.author = author
        self.text = text

class BaseHandler(tornado.web.RequestHandler):
    '''The base handler'''
    def get_current_user(self):
        return self.get_secure_cookie("user")
    def get_error_html(self, status_code, **kwargs):
        self.render("404.html")

class IndexHandler(BaseHandler):
    '''The main handler'''
    def get(self):
        if not self.current_user:
            self.redirect("/login")
            return
        q_file_object = open(os.path.join(os.path.dirname(__file__), \
            'static', 'data', 'questionData.txt'), 'r')
        q_files = q_file_object.read().splitlines()
        q_file_object.close()
        #read from userData

        r_file_object = open(os.path.join(os.path.dirname(__file__), \
            'static', 'data', 'replyData.txt'), 'r')
        r_files = r_file_object.read().splitlines()
        r_file_object.close()
        #read from userData

        replys = list()
        for line in r_files:
            seq = line.split(';')
            replys.append(Reply(seq[0], seq[1], seq[2], seq[3]))
        #get reply and store in list

        questions = list()
        for line in q_files:
            seq = line.split(';')
            q_reply = list()
            for reply in replys:
                if reply.q_author == seq[2]:
                    q_reply.append(reply)
                #if reply's name is equal to question'author append to q_reply
            questions.append(Question(seq[0], seq[1], seq[2], seq[3], q_reply))
        #get question and reply and store in list

        self.render("index.html", questions = questions)

class LoginHandler(BaseHandler):
    '''docstring for LoginHandler'''
    def get(self):
        if self.current_user:
            self.redirect("/")
            return
        #if logined, to index...
        self.render("login.html")

    def post(self):
        name = self.get_argument("name", None)
        password = self.get_argument("password", None)
        #get name and password
        file_object = open(os.path.join(os.path.dirname(__file__), \
            'static', 'data', 'userData.txt'), 'r')
        files = file_object.read().splitlines()
        file_object.close()
        #read from userData

        user_infos = dict()
        for line in files:
            seq = line.split(',')
            user_infos[seq[0]] = seq[1]
        #get user's name and password and store in a dict

        if name in user_infos and user_infos[name] == password:
            self.set_secure_cookie("user", name)
            self.redirect("/")
        elif not name or not password:
            self.render("login.html")
        else:
           self.render("login.html")
        #if match, turn to index, else stay

class SignupHandler(BaseHandler):
    '''docstring for SignupHandler'''
    def get(self):
        if self.current_user:
            self.redirect("/")
            return
        #if logined, to index...
        self.render("signup.html")
    def post(self):
        name = self.get_argument("name", None)
        password = self.get_argument("password", None)
        #get name and password
        file_object = open(os.path.join(os.path.dirname(__file__), \
            'static', 'data', 'userData.txt'), 'r')
        files = file_object.read().splitlines()
        file_object.close()
        #read from userData

        user_infos = dict()
        for line in files:
            seq = line.split(',')
            user_infos[seq[0]] = seq[1]
        #get user's name and password

        if not name or not password:
            self.render("signup.html")
            #incomplete
        elif not check_name(name) or not check_password(password):
            self.render("signup.html")
            #invalid
        elif name in user_infos:
            self.render("signup.html")
            #repeat
        else:
            file_object = open(os.path.join(os.path.dirname(__file__), \
                'static', 'data', 'userData.txt'), 'a')
            file_object.write(name + ',' + password + '\n')
            file_object.close()
            self.set_secure_cookie("user", name)
            self.redirect("/")

class QuestionHandler(BaseHandler):
    '''docstring for QuestionHandler'''
    def get(self):
        if not self.current_user:
            self.redirect("\login")
            return
        self.render("question.html")
    def post(self):
        title = self.get_argument("title", None)
        time = self.get_argument("time", None)
        text = self.get_argument("content", None)
        #get question
        if not title or not time or not text:
            self.render("question.html")
        else:
            file_object = open(os.path.join(os.path.dirname(__file__), \
                'static', 'data', 'questionData.txt'), 'a')
            file_object.write(title + ';' + time + ';' + self.get_secure_cookie("user") + ';' + text + '\n')
            file_object.close()
            self.redirect("/")

class LogoutHandler(BaseHandler):
    '''docstring for LogoutHandler'''
    def get(self):
        print "User " + self.get_secure_cookie("user") + " logged out."
        self.clear_cookie("user")
        self.write("Logout!")

if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = tornado.web.Application([
        (r"/", IndexHandler),
        (r"/login", LoginHandler),
        (r"/signup", SignupHandler),
        (r"/question", QuestionHandler),
        (r"/logout", LogoutHandler)
    ], cookie_secret="61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=", \
        template_path=os.path.join(os.path.dirname(__file__), "template"), \
        static_path=os.path.join(os.path.dirname(__file__), "static"), \
        debug=True)
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
