from my_app import db

# from flask_mongoengine import MongoEngine


class Group(db.Document):
    name = db.StringField(max_length=255, required=True, unique=True)

    def __repr__(self):
        return f"Grupo: {self.name}"


class Word(db.Document):
    to_learn = db.StringField(max_length=255, required=True)
    translation = db.StringField(max_length=255, required=True)
    synonymes = db.ListField(db.StringField(max_length=255))
    group = db.ReferenceField("Group")
    # group = db.ReferenceField("Group", reverse_delete_rule=mongoengine.CASCADE)

    def tojson(self):
        json = {
            "to_learn": self.to_learn,
            "translation": self.translation,
            "group": self.group.name,
            "id": str(self.id),
        }
        return json
