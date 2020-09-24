from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo



app = Flask(__name__)


mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")



@app.route("/")
def index():
    mars = mongo.db.mars.find_one()
    return render_template("index.html", mars=mars)

@app.route("/mardata")
def mongdata():
    facts = mongo.db.mars
    return (facts)




if __name__ == "__main__":
    app.run(debug=True)


