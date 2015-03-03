# -*- coding: utf-8 -*-

from flask import Flask, url_for, render_template, request
app = Flask(__name__)

@app.route("/")
def index():
    return "Index Page"

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        do_the_login()
    else:
        show_the_login_form()


@app.route("/hello/")
@app.route("/hello/<username>")
def hello(username = None):
    return render_template("hello.html", username = username)

@app.route("/projects/")
# Accessing it without a trailing slash will cause Flask to redirect to the canonical URL with the trailing slash.
def projects():
    return "The project page"

@app.route("/about")
# Accessing the URL with a trailing slash will produce a 404 “Not Found” error.
def about():
    return "The about page"


@app.route("/user/<username>")
def show_user_profile(username):
    # show the user profile for that user
    return "User %s" % username

@app.route("/post/<int:post_id>")
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return "Post %d" % post_id

if __name__ == "__main__":
    app.debug = True
    app.run()
    # Or app.run(debug = True)