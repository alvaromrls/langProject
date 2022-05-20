from flask import Flask
from flask_mongoengine import MongoEngine
from redis import Redis
import os
from flask_cors import CORS

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


client_origin_url = "http://localhost:5000"
auth0_audience = "https://dev-t178cgbr.us.auth0.com/api/v2/"
auth0_domain = "dev-t178cgbr.us.auth0.com"


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port="5000")
