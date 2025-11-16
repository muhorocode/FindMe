from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
import os

# Import configuration and database
from config import config
from models.missing_person import db

def create_app(config_name='development'):
    app = Flask(__name__)
    # Load configuration
    app.config.from_object(config[config_name])

    # JWT configuration
    app.config["JWT_SECRET_KEY"] = "your-secret-key"  # I will Change to a secure value in production later 
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]

    # Initialize extensions
    CORS(app)  # Enable CORS for React frontend
    db.init_app(app)  # Initialize SQLAlchemy
    migrate = Migrate(app, db)  # Initialize flask-migrate

    # Initialize JWTManager
    from flask_jwt_extended import JWTManager
    jwt = JWTManager(app)

    # Register missing persons routes
    from routes.missing_persons import missing_persons_bp
    app.register_blueprint(missing_persons_bp)

    # Create all database tables
    with app.app_context():
        db.create_all()

    # Register routes
    @app.route('/')
    def home():
        return jsonify({
            "message": "FindMe- Missing Persons Reporting API",
            "description": "Community-driven platform for reporting and tracking missing persons",
            "endpoints": {
                "health": "/api/health",
                "authentication": "/api/auth/register & /api/auth/login",
                "missing_persons": "/api/missing",
                "specific_person": "/api/missing/<id>"
            }
        })

    @app.route('/api/health')
    def health_check():
        # Test database connection
        try:
            db.session.execute(db.text('SELECT 1'))
            db_status = "connected"
        except Exception as e:
            db_status = f"error: {str(e)}"

        return jsonify({
            "status": "healthy",
            "database": db_status,
            "authentication": "JWT system ready",
            "message": "API is running with authentication"
        })

    return app

if __name__ == '__main__':
    app = create_app('development')
    print("Starting FindMe server with authentication...")
    app.run(debug=True, port=5000)