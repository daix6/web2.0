'''
python for index.html and results.html

Form Check Achieved!
'''
import os
import re

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options
define("port", default=8888, help="run on the given port", type=int)

def match(self, User):
    '''to match and return rating'''
    if self.seeking.find(User.gender) != -1 and User.seeking.find(self.gender) != -1:
        rating = 0
        if User.age >= self.minage and User.age <= self.maxage and \
            self.age >= User.minage and self.age <= User.maxage:
            rating += 1
        if self.pos == User.pos:
            rating += 1
        for ch in self.ptype:
            if User.ptype.find(ch) != -1:
                rating += 1
        return rating
    else:
        return False

def age_check(age):
    '''to check age'''
    pattern = re.compile(r'\d{1,2}')
    match = pattern.match(age)
    if match:
        return True
    else:
        return False

def ptype_check(ptype):
    '''to check ptype'''
    pattern = re.compile(r'(I|E)(N|S)(F|T)(J|P)')
    match = pattern.match(ptype)
    if match:
        return True
    else:
        return False

class User(object):
    """docstring for User"""
    def __init__(self, name, gender, age, ptype, pos, seeking, minage, maxage):
        self.name = name
        self.gender = gender
        self.age = age
        self.ptype = ptype
        self.pos = pos
        self.minage = minage
        self.maxage = maxage
        if len(seeking) == 2:
            self.seeking = seeking[0]+seeking[1]
        else:
            self.seeking = seeking[0]


class IndexHandler(tornado.web.RequestHandler):
    """docstring for IndexHandler"""
    def get(self):
        self.render("index.html")
    def post(self):
        name = self.get_argument("user_name", None)
        gender = self.get_argument("user_gender", None)
        age = self.get_argument("user_age", None)
        ptype = self.get_argument("user_type", None)
        pos = self.get_argument("user_os", None)
        seeking = self.get_arguments("user_sexual_orientation")
        minage = self.get_argument("user_minage", None)
        maxage = self.get_argument("user_maxage", None)
        #get info
        if not name or not gender or not age or not ptype or not pos \
            or not seeking or not minage or not maxage:
            self.render("error.html", error_msg = "You didn't fill out the form completely.")
        elif not age_check(age) or not age_check(minage) or not age_check(maxage) or minage > maxage:
            self.render("error.html", error_msg = "Age should between 0 and 99, and minage should <= maxage")
        elif not ptype_check(ptype):
            self.render("error.html", error_msg = "Personality type should be checked!")
        else:
            current_user = User(name, gender, age, ptype, pos, seeking, minage, maxage)
            file_object = open(os.path.join(os.path.dirname(__file__), \
                "static/database", "singles.txt"), 'r')
            files = file_object.read().splitlines()
            file_object.close()
            #read from singles
            file_object = open(os.path.join(os.path.dirname(__file__), \
                "static/database", "singles.txt"), 'a')
            file_object.write(name + ',' + gender + ',' + age + ',' + ptype + ',' \
            	+ pos + ',' + current_user.seeking + ',' + minage + ',' + maxage + '\n')
            file_object.close()
            #write to singles
            singles = list()
            results = list()
            rating = list()
            images = list()
            for line in files:
                seq = line.split(',')
                singles.append(User(seq[0], seq[1], seq[2], seq[3], \
                    seq[4], seq[5], seq[6], seq[7]))

            for i in range(len(singles)):
                if match(current_user, singles[i]) >= 3:
                    results.append(singles[i])
                    rating.append(match(current_user, singles[i]))

            images_path = os.path.join(os.path.dirname(__file__), 'static/images')
            images_file = os.listdir(images_path)
            for i in range(len(results)):
                image_name = results[i].name.lower().replace(' ', '_')
                image_name += '.jpg'
                if images_file.count(image_name) == 0:
                    image_name = 'default_user.jpg'
                images.append(image_name)

            self.render("results.html", current_user = current_user, images = images, \
                results = results, singles = singles, rating = rating)


def main():
    '''main'''
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=[(r'/', IndexHandler)],
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        debug=True
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()

if __name__ == '__main__':
    main()