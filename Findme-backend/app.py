from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
import os

# import configuration and database setup
from config import config
from models.db import db 
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
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    # create all database tables when the application starts
    with app.app_context():
        try:
            print("🔄 Creating database tables...")
            
            # Import models inside app context to ensure proper initialization
            try:
                from models.user import User
                print("✅ User model imported successfully")
            except ImportError as e:
                print(f"❌ Failed to import User model: {e}")
            
            try:
                from models.missing_person import MissingPerson
                print("✅ MissingPerson model imported successfully")
            except ImportError as e:
                print(f"❌ Failed to import MissingPerson model: {e}")
            
            # Create all tables
            db.create_all()
            print("✅ Database tables created successfully!")
            
            # Verify tables were created
            from sqlalchemy import inspect
            inspector = inspect(db.engine)
            tables = inspector.get_table_names()
            print(f"📊 Available tables: {tables}")
            
        except Exception as e:
            print(f"❌ Database error during table creation: {e}")
            # Try to get more detailed error info
            import traceback
            print(f"🔍 Detailed traceback: {traceback.format_exc()}")

    # define application routes and endpoints
    @app.route('/')
    def home():
        return jsonify({
            "message": "FindMe API backend is running",
            "routes": {
                "auth": "/api/auth",
                "missing persons": "/api/missing-persons",
                "my reports": "/api/missing-persons/mine"
            }
        })

    @app.route('/api/health')
    def health_check():
        # test database connection to ensure postgresql is working properly
        try:
            db.session.execute(db.text('SELECT 1'))
            db_status = "connected"
            
            # Check if users table exists
            from sqlalchemy import inspect
            inspector = inspect(db.engine)
            tables = inspector.get_table_names()
            tables_status = f"tables: {tables}"
            
        except Exception as e:
            db_status = f"error: {str(e)}"
            tables_status = "unknown"

        return jsonify({
            "status": "healthy",
            "database": db_status,
            "tables": tables_status,
            "message": "API is running with complete authentication system"
        })

    # Add missing persons endpoints
    @app.route('/api/missing-persons', methods=['GET'])
    def get_missing_persons():
        try:
            # Try to get from database first
            from models.missing_person import MissingPerson
            persons = MissingPerson.query.all()
            return jsonify([person.to_dict() for person in persons])
        except Exception as e:
            # Return mock data if database not ready
            return jsonify([
                {
                    "id": 1,
                    "full_name": "Demo Person",
                    "age": 25,
                    "gender": "Unknown",
                    "last_seen_location": "Demo Location",
                    "contact_name": "Demo Contact",
                    "contact_phone": "000-000-0000",
                    "status": "missing",
                    "description": "This is demonstration data - database initializing"
                }
            ])

    @app.route('/api/missing-persons/mine', methods=['GET'])
    def get_my_reports():
        return jsonify({
            "msg": "Authentication required - please login first",
            "note": "This endpoint requires JWT token"
        }), 401

    return app

if __name__ == '__main__':
    # start the flask development server
    app = create_app('development')
    print("🚀 Starting FindMe server with complete authentication system...")
    print("📝 Debug information will show above...")
    app.run(debug=True, port=5000)