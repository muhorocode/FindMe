# Import necessary modules from Flask and controller
from flask import Blueprint, request, jsonify
from controllers.missing_persons_controller import (
    create_missing_person,
    get_all_missing_persons,
    get_missing_person_by_id,
)

# Create a Blueprint for missing persons endpoints
missing_persons_bp = Blueprint("missing_persons", __name__, url_prefix="/api/missing-persons")


# Define the POST endpoint to create a missing person report
@missing_persons_bp.route("", methods=["POST"])
def post_missing_person():
    # Get JSON data from the request body
    data = request.get_json()
    # Call the controller function to handle business logic
    result = create_missing_person(data)
    # Return the response as JSON, with the appropriate status code
    return jsonify(result), result.get("status", 201)


# Define the GET endpoint to fetch all missing persons reports
@missing_persons_bp.route("", methods=["GET"])
def list_missing_persons():
    data = get_all_missing_persons()
    return jsonify(
        {
            "success": True,
            "data": data,
            "message": "Missing persons fetched",
        }
    ), 200


# Define the GET endpoint to fetch a single missing person report by ID
@missing_persons_bp.route("/<int:person_id>", methods=["GET"])
def get_missing_person_detail(person_id):
    person = get_missing_person_by_id(person_id)
    if not person:
        return jsonify(
            {
                "success": False,
                "error": "Missing person not found",
            }
        ), 404
    return jsonify(
        {
            "success": True,
            "data": person.to_dict(),
            "message": "Missing person details",
        }
    ), 200
