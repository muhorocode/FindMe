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
                "auth": "/api/auth",
                "missing persons": "/api/missing-persons",
                "my reports": "/api/missing-persons/mine"
            }
        })

    return app


if __name__ == "__main__":
    app = create_app("development")
    app.run(debug=True, port=5000)