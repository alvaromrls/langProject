from flask import request, Blueprint, jsonify
from my_app.vocabulary.models import Group, Word
from flask.views import MethodView

vocabulary = Blueprint("vocabulary", __name__)

URL_API = "/api/vocabulary"


def register_api(view, endpoint, url, pk="id", pk_type="int"):
    view_func = view.as_view(endpoint)
    vocabulary.add_url_rule(
        url,
        defaults={pk: None},
        view_func=view_func,
        methods=[
            "GET",
        ],
    )
    vocabulary.add_url_rule(
        url,
        view_func=view_func,
        methods=[
            "POST",
        ],
    )
    vocabulary.add_url_rule(
        f"{url}<{pk_type}:{pk}>", view_func=view_func, methods=["GET", "PUT", "DELETE"]
    )


class ManageGroup(MethodView):
    def get(self, group_id):
        if group_id is None:
            groups = Group.objects.all()
            return jsonify(groups)
        else:
            group = Group.objects.get_or_404(pk=str(group_id))
            return jsonify(group)

    def post(self):
        name = request.form.get("name")
        if name:
            group = Group(name=name)
            group.save()
            return jsonify(group)
        else:
            return jsonify("Name not found in body")

    def delete(self, group_id):
        group = Group.objects(pk=group_id)
        if group:
            group.first().delete()
            return jsonify("deleted")
        else:
            return jsonify("Doesnt exist")

    def put(self, group_id):
        group = Group.objects(pk=group_id)
        if group:
            group = group.first()
            name = request.form.get("name")
            if name:
                group.name = name
                group.save()
                return jsonify(group)
            else:
                return jsonify("Name not found in body")
        else:
            return jsonify({"Object ID Doesnt exist": group_id})


GROUP_URL = URL_API + "/group/"

register_api(ManageGroup, "group_api", GROUP_URL, pk="group_id", pk_type="string")


class ManageWord(MethodView):
    def get(self, word_id):
        if word_id is None:
            group = request.args.get("group")
            if group:
                group = Group.objects(name=group).first()
                results = Word.objects(group=group).all()
                return jsonify([result.tojson() for result in results])
            else:
                return jsonify(Word.objects().all())
        else:
            word = Word.objects(pk=str(word_id))
            if word:
                return jsonify(word.first().tojson())
            else:
                return jsonify("404")

    def post(self):
        group_name = request.form.get("group")
        group = Group.objects(name=group_name)
        to_learn = request.form.get("to_learn")
        translation = request.form.get("translation")
        params = [group, to_learn, translation]
        if all(params):
            word = Word(group=group.first(), to_learn=to_learn, translation=translation)
            word.save()
            return jsonify(word)
        else:
            return jsonify({"Something went wrong": params})

    def delete(self, word_id):
        word = Word.objects(pk=word_id)
        if word:
            word.first().delete()
            return jsonify("deleted")
        else:
            return jsonify("Doesnt exist")

    def put(self, word_id):
        word = Word.objects(pk=word_id)
        if word:
            word = word.first()
            word.to_learn = request.form.get("to_learn", word.to_learn)
            word.translation = request.form.get("translation", word.translation)
            word.save()
            return jsonify(word.tojson())
        else:
            return jsonify({"Object ID Doesnt exist": word_id})


WORD_URL = URL_API + "/word/"

register_api(ManageWord, "word_api", WORD_URL, pk="word_id", pk_type="string")
