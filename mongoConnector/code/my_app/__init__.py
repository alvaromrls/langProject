from flask import Flask
from flask_mongoengine import MongoEngine
from redis import Redis
import os

host = os.environ.get("MONGO_URL") or "mongodb://localhost:31001"

app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {
    "DB": "my_catalog",
    "host": host,
    # "port": 27017,
}
app.debug = True

db = MongoEngine(app)

redis = Redis()

from my_app.vocabulary.views import vocabulary

app.register_blueprint(vocabulary)
