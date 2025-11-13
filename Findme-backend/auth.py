from flask import Blueprint, request, jsonify
import jwt
import datetime
from models.user import User, db  # You'll need to create this model

auth_bp = Blueprint('auth', __name__)
SECRET_KEY = "findme-secret-key-2024"

@auth_bp.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Check if user exists in DATABASE
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({'error': 'Email already registered'}), 400
        
        # Create user in DATABASE
        new_user = User(
            name=data['name'],
            email=data['email']
        )
        new_user.set_password(data['password'])
        
        db.session.add(new_user)
        db.session.commit()
        
        # Generate token... (rest of your code)