from my_app import db


class Group(db.Document):
    name = db.StringField(max_length=255, required=True)
    user_email = db.StringField(max_length=100, required=True)

    def __repr__(self):
        return f"Grupo: {self.name}"


class Word(db.Document):
    to_learn = db.StringField(max_length=255, required=True)
    translation = db.StringField(max_length=255, required=True)
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
