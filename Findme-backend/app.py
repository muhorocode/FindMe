from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
import os

# import configuration and database setup
from config import config
from models.missing_person import db
from routes.auth import auth_bp  # authentication routes for user management

def create_app(config_name='development'):
    app = Flask(__name__)
    
    # load configuration settings for the application
    app.config.from_object(config[config_name])
    
    # initialize extensions and middleware
    CORS(app)  # enable cross-origin requests for frontend communication
    db.init_app(app)  # connect sqlalchemy to our flask application
    migrate = Migrate(app, db)  # set up database migrations for schema changes
    
    # register authentication routes for user login and registration
    app.register_blueprint(auth_bp)

    # create all database tables when the application starts
    with app.app_context():
        db.create_all()

    # define application routes and endpoints
    @app.route('/')
    def home():
        return jsonify({
            "message": "FindMe- Missing Persons Reporting API",
            "description": "Community-driven platform for reporting and tracking missing persons",
            "endpoints": {
                "health": "/api/health",
                "authentication": "/api/auth/register & /api/auth/login & /api/auth/me",
                "missing_persons": "/api/missing",
                "specific_person": "/api/missing/<id>"
            }
        })

    @app.route('/api/health')
    def health_check():
        # test database connection to ensure postgresql is working properly
        try:
            db.session.execute(db.text('SELECT 1'))
            db_status = "connected"
        except Exception as e:
            db_status = f"error: {str(e)}"

        return jsonify({
            "status": "healthy",
            "database": db_status,
            "authentication": "JWT system active with PostgreSQL",
            "message": "API is running with complete authentication system"
        })

    return app

if __name__ == '__main__':
    # start the flask development server
    app = create_app('development')
    print("starting FindMe server with complete authentication system...")
    app.run(debug=True, port=5000)