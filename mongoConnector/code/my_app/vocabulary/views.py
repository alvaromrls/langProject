from flask import abort
from flask import request, Blueprint, jsonify
from my_app.vocabulary.models import Group, Word
from flask.views import MethodView
from my_app.security.auth0 import get_user_from_bearer

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
        """
        GET METHOD FOR group CLASS
        """
        # IF ID IS GIVEN
        if group_id:
            group = Group.objects.get_or_404(pk=str(group_id))
            return jsonify(group)

        # GET ACCESS TOKEN
        token = get_user_from_bearer(request)

        # GET GROUPS BY TOKEN
        if token:
            groups = Group.objects(user_email=token["email"]).all()
            return jsonify(groups)

        # GET ALL (DEFAULT)
        else:
            groups = Group.objects.all()
            return jsonify(groups)

    def post(self):
        """
        POST METHOD FOR group CLASS
        """
        # GET NAME & TOKEN
        name = request.form.get("name")
        token = get_user_from_bearer(request)

        # CHECK IF TOKEN
        if token:
            email = token["email"]
        else:
            abort(401)

        # SAVE IF CONTAINS NAME, ELSE ERROR 400: BAD REQUESTS
        if name:
            group = Group(name=name, user_email=email)
            try:
                group.save()
            except Exception:
                abort(500)
            return jsonify(group)
        else:
            abort(400)

    def delete(self, group_id):
        """
        DELETE METHOD FOR group CLASS
        """
        # GET NAME & ITEM FROM ID (404 IF NOT FOUND)
        group = Group.objects.get_or_404(pk=str(group_id))
        token = get_user_from_bearer(request)

        # CHECK IF EMAIL IS EQUAL TO USER EMAIL  (DELETE ITEM IF TRUE, 401 IF NOT)
        if token and (token.get("email") == group.user_email):
            group.delete()
            return jsonify("ITEM DELETED")
        else:
            abort(401)

    def put(self, group_id):
        """
        PUT METHOD FOR group CLASS
        """
        # GET NAME & ITEM FROM ID (404 IF NOT FOUND)
        group = Group.objects.get_or_404(pk=str(group_id))
        token = get_user_from_bearer(request)

        # CHECK IF NAME -> UPDATE IT FROM MODEL IF TRUE
        name = request.form.get("name")
        if name:
            group.name = name
        else:
            abort(400)

        # CHECK IF EMAIL IS EQUAL TO USER EMAIL  (UPDATE ITEM IF TRUE, 401 IF NOT)
        if token and (token.get("email") == group.user_email):
            try:
                group.save()
                return jsonify(group)
            except:
                abort(500)
        else:
            abort(401)


GROUP_URL = URL_API + "/group/"

register_api(ManageGroup, "group_api", GROUP_URL, pk="group_id", pk_type="string")


class ManageWord(MethodView):
    def get(self, word_id):
        """
        GET METHOD FOR word CLASS
        """
        # GET A LIST
        if word_id is None:
            group_id = request.args.get("group")
            # GROUP IS PROVIDED IN REQ ARGS
            if group_id:
                group = Group.objects.get_or_404(pk=str(group_id))
                results = Word.objects(group=group).all()
                return jsonify([result.tojson() for result in results])
            # RETURN ALL
            else:
                return jsonify(Word.objects().all())
        # GET A ITEM (IF CORRECT ID IS PROVIDED)
        else:
            word = Word.objects.get_or_404(pk=str(word_id))
            return jsonify(word.tojson())

    def post(self):
        """
        GET METHOD FOR word CLASS
        """
        # GET FORM ITEMS
        group_id = request.form.get("group_id")
        to_learn = request.form.get("to_learn")
        translation = request.form.get("translation")

        # CHECK ALL ITEMS ARE INCLUDED IN FORM (400 IF NOT)
        if not (group_id and to_learn and translation):
            abort(400)

        # CHECK GROUP EXISTS (400 IF NOT)
        group = Group.objects.get_or_404(pk=str(group_id))

        # GET TOKEN
        token = get_user_from_bearer(request)

        # VERIFY TOKEN (401 IF FAILS), SAVE THE ELEMENT (500 IF FAILS)
        if token and (token.get("email") == group.user_email):
            # CREATE THE NEW ITEM
            word = Word(group=group, to_learn=to_learn, translation=translation)
            try:
                word.save()
                return jsonify(word)
            except:
                abort(500)  # INTERNAL ERROR
        else:
            abort(401)  # NOT AUTH

    def delete(self, word_id):
        """
        DELETE METHOD FOR word CLASS
        """
        # GET WORD FROM ID (404 IF FAILS)
        word = Word.objects.get_or_404(pk=str(word_id))

        # GET TOKEN
        token = get_user_from_bearer(request)

        if token and (token.get("email") == word.group.user_email):
            word.delete()
            return jsonify("ITEM DELETED")
        else:
            abort(401)

    def put(self, word_id):
        """
        PUT METHOD FOR word CLASS
        """
        # GET WORD FROM ID (404 IF FAILS)
        word = Word.objects.get_or_404(pk=str(word_id))

        # GET FORM ITEMS
        word.to_learn = request.form.get("to_learn", word.to_learn)
        word.translation = request.form.get("translation", word.translation)

        # GET TOKEN
        token = get_user_from_bearer(request)

        # VERIFY TOKEN (401 IF FAILS), SAVE THE ELEMENT (500 IF FAILS)
        if token and (token.get("email") == word.group.user_email):
            try:
                word.save()
                return jsonify(word)
            except:
                abort(500)  # INTERNAL ERROR
        else:
            abort(401)  # NOT AUTH


WORD_URL = URL_API + "/word/"

register_api(ManageWord, "word_api", WORD_URL, pk="word_id", pk_type="string")
