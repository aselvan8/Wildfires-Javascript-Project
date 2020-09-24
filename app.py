from flask import Flask, render_template, redirect, jsonify

from flask_pymongo import PyMongo
from bson.json_util import dumps
import requests

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
# mongo = PyMongo(app)

mongo = PyMongo(app, uri="mongodb://localhost:27017/fire_db")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    fire = mongo.db.fire_db.find()
    return render_template("index.html", fire=fire)


@app.route("/firedata")
def firedata():

    fire = list(mongo.db.filtered_fire.find())
    fire_json = dumps(fire)
    return fire_json


# Route that will trigger the scrape function
# @app.route("/scrape")
# def scrape():

#     mars = mongo.db.mars
#     # Run the scrape function
#     mars_data = scrape_mars.scrape()

#     # Update the Mongo database using update and upsert=True
#     # mongo.db.collection.update({}, mars_data, upsert=True)
#     mars.update({}, mars_data, upsert=True)

#     # Redirect back to home page
#     return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)
