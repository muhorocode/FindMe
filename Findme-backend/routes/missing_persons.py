# Import necessary modules from Flask and controller
from flask import Blueprint, request, jsonify
from controllers.missing_persons_controller import create_missing_person

# Create a Blueprint for missing persons endpoints
missing_persons_bp = Blueprint('missing_persons', __name__, url_prefix='/api/missing-persons')

# Define the POST endpoint to create a missing person report
@missing_persons_bp.route('', methods=['POST'])
def post_missing_person():
	# Get JSON data from the request body
	data = request.get_json()
	# Call the controller function to handle business logic
	result = create_missing_person(data)
	# Return the response as JSON, with the appropriate status code
	return jsonify(result), result.get('status', 201)
