
from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps




app = Flask(__name__)


mongo = PyMongo(app, uri="mongodb://localhost:27017/fire_db")



@app.route("/")
def index():
    fires = mongo.db.filtered_fire.find()
    return render_template("index.html", fires=fires)


@app.route("/firedata")
def firedata():
    fires = list(mongo.db.filtered_fire.find())
    fire_json = dumps(fires)
    return fire_json

@app.route("/ninodata")
def ninodata():
    ninos = list(mongo.db.nino_data.find())
    nino_json = dumps(ninos)
    return nino_json



if __name__ == "__main__":
    app.run(debug=True)
