import os
import tornado.wsgi
import sae
import wsgiref.handlers

settings = { 
"static_path" : os.path.join(os.path.dirname(__file__), "static"), 
"template_path" : os.path.join(os.path.dirname(__file__), "templates"), 
"gzip" : True, 
"debug" : True, 
}

FLAG = 0

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
                break
            line = operator.readline()
        operator.close()
        global FLAG
        FLAG = 1
        self.redirect("/login")
        

class IndexHandler(BaseHandler):
    def get(self):
        if not self.current_user:
            self.redirect("/login")
        else:
            global FLAG
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
        writer.write(name__+','+password__+",00"+'\r\n')
        writer.close()
        self.set_secure_cookie("name", self.get_argument("name"))
        self.redirect("/")

class LogoutHandler(BaseHandler):
    def get(self):
        self.clear_cookie("name")
        self.redirect("/")

class ContinueHandler(BaseHandler):
    def get(self):
        if not self.current_user:
            self.redirect("/login")
        else:
            operator = open('static/data/userData.txt');
            line = operator.readline()
            while line:
                line.strip('\r\n')
                lines = line.split(',')
                if self.current_user == lines[0]:
                    break
                line = operator.readline()
            backdrop__ = lines[2]
            print backdrop__
            backdrop__ = backdrop__.strip('\r\n')
            operator.close()
            self.render('game.html', user=self.current_user, backdrop=backdrop__)

class SaveHandler(BaseHandler):
    def get(self):
        background__ = self.get_argument('background', 'None')
        print background__
        reader = open('static/data/userData.txt')  
        lines  = reader.readlines()  
        reader.close()  
        output  = open('static/data/userData.txt','w')
        for line in lines:  
            if not line:  
                break
            if self.current_user in line:  
                temp = line.split(',')
                temp1 = temp[0] + "," + temp[1] + "," + background__
                temp1 = temp1.strip('\r\n')
                temp1 = temp1 + '\r\n'
                output.write(temp1)
            else:
                output.write(line)
        output.close()
        self.redirect('/continue')

app = tornado.wsgi.WSGIApplication([
     (r'/', IndexHandler),
     (r'/login', LoginHandler),
     (r'/logout', LogoutHandler),
     (r'/signup', SignupHandler),
     (r'/start', StartHandler),
     (r'/continue', ContinueHandler),
     (r'/save', SaveHandler),
     (r'.*', WrongHandler)
], cookie_secret="61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=", 
       template_path=os.path.join(os.path.dirname(__file__), "templates"),
       static_path=os.path.join(os.path.dirname(__file__), "static"),
       debug=True)

application = sae.create_wsgi_app(app)