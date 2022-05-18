from flask import Flask
from flask_mongoengine import MongoEngine
from redis import Redis
import os
from flask_cors import CORS
import pymongo

# "Production" will take the env, local the fix address
host = os.environ.get("MONGO_URL") or "mongodb://localhost:31001"

app = Flask(__name__)

# Allow all CORS
CORS(app)

app.config["MONGODB_SETTINGS"] = {
    "DB": "my_catalog",
    "host": host,
    # "connect": False
    # "port": 27017,
}

# Debug if Local
app.debug = False if os.environ.get("MONGO_URL") else True

db = MongoEngine(app)

redis = Redis()

from my_app.vocabulary.views import vocabulary

app.register_blueprint(vocabulary)

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port="5000")
