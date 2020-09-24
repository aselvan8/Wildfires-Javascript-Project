
from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps



app = Flask(__name__)


mongo = PyMongo(app, uri="mongodb://localhost:27017/firedata")



@app.route("/")
def index():
    fires = mongo.db.fire_data.find()
    return render_template("index.html", fires=fires)


@app.route("/firedata")
def firedata():
    fires = list(mongo.db.fire_data.find())
    fire_json = dumps(fires)
    return fire_json



if __name__ == "__main__":
    app.run(debug=True)
