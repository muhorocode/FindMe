
# routes/missing_persons.py

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.cloudinary_helper import upload_photo
from models.missing_person import MissingPerson
from models.db import db

missing_persons_bp = Blueprint(
    "missing_persons", 
    __name__, 
    url_prefix="/api/missing-persons"
)

# ----------------------------------------
# CREATE REPORT (AUTHENTICATION REQUIRED)
# ----------------------------------------
@missing_persons_bp.route("", methods=["POST"])
@jwt_required()
def create_missing_person_route():
    user_id = get_jwt_identity()

    # Accept form-data and JSON
    if request.content_type and request.content_type.startswith("multipart/form-data"):
        data = request.form.to_dict()
        photo = request.files.get("photo")
        if photo:
            data["photo_url"] = upload_photo(photo)
    else:
        data = request.get_json()

    data["user_id"] = user_id

    person = MissingPerson(**data)
    db.session.add(person)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Missing person report created",
        "data": person.to_dict()
    }), 201


# ----------------------------------------
# GET ALL REPORTS
# ----------------------------------------
@missing_persons_bp.route("", methods=["GET"])
def list_all_reports():
    persons = MissingPerson.query.all()
    return jsonify({
        "success": True,
        "data": [p.to_dict() for p in persons]
    }), 200


# ----------------------------------------
# GET SINGLE REPORT
# ----------------------------------------
@missing_persons_bp.route("/<int:person_id>", methods=["GET"])
def get_single_report(person_id):
    person = MissingPerson.query.get(person_id)
    if not person:
        return jsonify({"success": False, "error": "Not found"}), 404

    return jsonify({
        "success": True,
        "data": person.to_dict()
    }), 200


# ----------------------------------------
# GET MY REPORTS (AUTH REQUIRED)
# ----------------------------------------
@missing_persons_bp.route("/mine", methods=["GET"])
@jwt_required()
def get_my_reports():
    user_id = get_jwt_identity()
    reports = MissingPerson.query.filter_by(user_id=user_id).all()

    return jsonify({
        "success": True,
        "data": [p.to_dict() for p in reports]
    }), 200