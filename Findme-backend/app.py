# app.py

from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from config import config
from models.db import db, bcrypt
from routes.auth import auth_bp
from routes.missing_persons import missing_persons_bp
from routes.search import search_bp

def create_app(config_name='development'):
    app = Flask(__name__)

    app.config.from_object(config[config_name])
    app.config["JWT_SECRET_KEY"] = "your-secret-key"
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]

    # Init extensions
    if app.config.get("ENV") == "production":
        CORS(app, resources={r"/*": {"origins": "https://find-me-ashen.vercel.app"}})
    else:
        CORS(app, resources={r"/*": {"origins": "*"}})
    
    db.init_app(app)
    bcrypt.init_app(app)
    Migrate(app, db)
    
    jwt = JWTManager(app)

    @jwt.user_identity_loader
    def user_identity_lookup(user_id):
        return user_id

    # ✅ CRITICAL FIX: Import models BEFORE creating tables
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

    # ✅ CRITICAL FIX: Create database tables inside app context
    with app.app_context():
        try:
            print("🔄 Creating database tables...")
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

    # Register routes
    app.register_blueprint(auth_bp)
    app.register_blueprint(missing_persons_bp)
    app.register_blueprint(search_bp)

    @app.route("/")
    def home():
        return jsonify({
            "message": "FindMe API backend is running",
            "routes": {
                "auth": [
                    "/api/auth/register",
                    "/api/auth/login",
                    "/api/auth/me"
                ],
                "missing_persons": "/api/missing-persons",
                "specific_person": "/api/missing-persons/<id>",
                "my_reports": "/api/missing-persons/mine",
                "search": "/api/search?name=...&location=...&age_min=...&age_max=...&gender=...&status=...",
                "filter_location": "/api/missing-persons/location/<city>",
                "recent_reports": "/api/missing-persons/recent",
                "statistics": "/api/missing-persons/stats",
                "health": "/api/health"
            }
        })

    # Health endpoint implementation
    @app.route("/api/health")
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

    return app


if __name__ == "__main__":
    app = create_app("development")
    print("🚀 Starting FindMe server with database initialization...")
    app.run(debug=True, port=5000)