# app.py

from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flaskq_jwt_extended import JWTManager

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
    app.run(debug=True, port=5000)