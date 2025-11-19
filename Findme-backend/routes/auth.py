from flask import Blueprint, request, jsonify
import jwt
import datetime
from models.db import db, bcrypt
from models.user import User

auth_bp = Blueprint('auth', __name__)
SECRET_KEY = "findme-secret-key-2024"  # this secret key signs and verifies jwt tokens

@auth_bp.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()  # get json data sent in the request
        
        # make sure the user gave all required fields
        if not data.get('name') or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'name, email and password are required'}), 400
        
        # check if this email already belongs to another user
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({'error': 'a user with this email already exists'}), 400
        
        # create a new user using the data provided
        new_user = User(
            name=data['name'],
            email=data['email']
        )
        new_user.set_password(data['password'])  # hash the password before saving
        
        db.session.add(new_user)  # add user to the database
        db.session.commit()       # save the changes
        
        # generate a jwt token for the newly registered user
        token = jwt.encode({
            'user_id': new_user.id,
            'email': new_user.email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)  # token expires in 24 hours
        }, SECRET_KEY, algorithm='HS256')
        
        # send a success message along with the user id and token
        return jsonify({
            'message': 'user registered successfully',
            'user_id': new_user.id,
            'token': token
        }), 201
        
    except Exception as e:
        db.session.rollback()  # undo changes if anything goes wrong
        return jsonify({'error': f'registration failed: {str(e)}'}), 500

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()  # read login data from request
        
        # check if both email and password were provided
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'email and password are required'}), 400
        
        # look for a user with the given email
        user = User.query.filter_by(email=data['email']).first()
        
        # verify email and password
        if not user or not user.check_password(data['password']):
            return jsonify({'error': 'invalid email or password'}), 401
        
        # create a jwt token for the authenticated user
        token = jwt.encode({
            'user_id': user.id,
            'email': user.email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY, algorithm='HS256')
        
        # send a success response with user info
        return jsonify({
            'message': 'login successful',
            'user_id': user.id,
            'name': user.name,
            'token': token
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'login failed: {str(e)}'}), 500

@auth_bp.route('/api/auth/me', methods=['GET'])
def get_current_user():
    token = request.headers.get('Authorization')  # read token from request headers
    
    # make sure the user actually sent a token
    if not token:
        return jsonify({'error': 'authentication token is required'}), 401
    
    try:
        # remove the 'Bearer ' part if it exists
        if token.startswith('Bearer '):
            token = token[7:]
            
        # decode the token and get the payload
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        
        # find the user using the id inside the token
        user = User.query.get(payload['user_id'])
        if not user:
            return jsonify({'error': 'user not found'}), 404
            
        # return the user info as json
        return jsonify(user.to_dict()), 200
        
    except jwt.ExpiredSignatureError:
        # the token is valid but no longer active
        return jsonify({'error': 'your session has expired, please login again'}), 401
        
    except jwt.InvalidTokenError:
        # the token is corrupted or fake
        return jsonify({'error': 'invalid authentication token'}), 401
