# -*- coding: utf-8 -*-
import os
import tornado.wsgi
import sae
import wsgiref.handlers
import sae.kvdb

settings = { 
    "static_path" : os.path.join(os.path.dirname(__file__), "static"), 
    "template_path" : os.path.join(os.path.dirname(__file__), "templates"), 
    "gzip" : True, 
    "debug" : True, 
}

FLAG = 0

kv = sae.kvdb.KVClient()

class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("name")

class WrongHandler(tornado.web.RequestHandler):
    def get(self):
        self.write_error(404)

    def write_error(self, status_code, **kwages):
        if status_code == 404:
            self.render('404.html')
        else:
            self.write('error: ' + str(status_code))

class LoginHandler(BaseHandler):
    def get(self):
        if self.current_user:
            self.redirect('/')
        else:
            global FLAG
            self.render('login.html', flag=FLAG)

    def post(self):
        global FLAG
        name__ = self.get_argument('name', 'None')
        password__ = self.get_argument('password', 'None')
        if (kv.get(name__.encode()) != None):
            if (kv.get(name__.encode()).split(" ")[0] == password__.encode()):
                self.set_secure_cookie("name", self.get_argument("name"))
                FLAG = 0
                self.redirect('/')
            else:
                FLAG = 1
                self.redirect('/login')
        else:
            FLAG = 1
            self.redirect('/login')

class IndexHandler(BaseHandler):
    def get(self):
        global FLAG
        if not self.current_user:
            self.redirect("/login")
        else:
            FLAG = 0
            self.render('index.html', user=self.current_user)

class StartHandler(BaseHandler):
    def get(self):
        if not self.current_user:
            self.redirect("/login")
        else:
            self.render('game.html', user=self.current_user, backdrop = "00")

class SignupHandler(BaseHandler):
    def get(self):
        if self.current_user:
            self.redirect("/")
        else:
            self.render('signup.html')

    def post(self):
        name__ = self.get_argument('name', 'None')
        password__ = self.get_argument('password', 'None')
        password__ += " 00"
        kv.add(name__.encode(), password__.encode())
        self.set_secure_cookie("name", self.get_argument("name"))
        self.redirect("/")

class LogoutHandler(BaseHandler):
    def get(self):
        self.clear_cookie("name")
        FLAG = 0
        self.redirect("/login")

class ContinueHandler(BaseHandler):
    def get(self):
        if not self.current_user:
            self.redirect("/login")
        else:
            backdrop__ = kv.get(self.current_user).split(" ")[1]
            self.render('game.html', user=self.current_user, backdrop=backdrop__)

class SaveHandler(BaseHandler):
    def get(self):
        background__ = self.get_argument('background', 'None')
        password__ = kv.get(self.current_user).split(" ")[0]
        password__ += " "
        password__ += background__
        kv.replace(self.current_user, password__)
        self.render('game.html', user=self.current_user, backdrop=background__)

app = tornado.wsgi.WSGIApplication([
     (r'/', IndexHandler),
     (r'/login', LoginHandler),
     (r'/logout', LogoutHandler),
     (r'/signup', SignupHandler),
     (r'/start', StartHandler),
     (r'/continue', ContinueHandler),
     (r'/save.*', SaveHandler),
     (r'.*', WrongHandler)
], cookie_secret="61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=", 
       template_path=os.path.join(os.path.dirname(__file__), "templates"),
       static_path=os.path.join(os.path.dirname(__file__), "static"),
       debug=True)

application = sae.create_wsgi_app(app)