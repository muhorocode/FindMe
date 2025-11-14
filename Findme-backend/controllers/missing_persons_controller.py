#Controller for MissingPerson CRUD operations
from models.missing_person import MissingPerson
from models.missing_person import db
from sqlalchemy.exc import IntegrityError


def create_missing_person(data):
    """
    Create a new missing person report.
    Args:
        data (dict): Incoming JSON data from the request
    Returns:
        dict: Response object with success, data/error, message, and status code
    """
    # List of required fields for a valid report
    required_fields = [
        'full_name', 'age', 'gender', 'last_seen_date',
        'last_seen_location', 'contact_name', 'contact_phone'
    ]
    # Check for missing required fields
    missing = [f for f in required_fields if not data.get(f)]
    if missing:
        return {
            "success": False,
            "error": f"Missing required fields: {', '.join(missing)}",
            "status": 400
        }
    try:
        # Create a new MissingPerson instance using the provided data
        person = MissingPerson(**data)
        # Add the new person to the database session
        db.session.add(person)
        # Commit the session to save changes to the database
        db.session.commit()
        # Return a success response with the new person's data
        return {
            "success": True,
            "data": person.to_dict(),  # Assumes MissingPerson has a to_dict() method
            "message": "Missing person report created",
            "status": 201
        }
    except IntegrityError as e:
        # Rollback the session if there's a database error (e.g., duplicate case_number)
        db.session.rollback()
        return {
            "success": False,
            "error": "Case number must be unique",
            "status": 409
        }
    except Exception as e:
        # Rollback for any other errors and return a generic error message
        db.session.rollback()
        return {
            "success": False,
            "error": str(e),
            "status": 500
        }
