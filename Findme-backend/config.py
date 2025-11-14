import os

# Base configuration class
class Config:
    # Secret key for sessions and JWT authentication
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'findme-secret-key-2024'
    # PostgreSQL database configuration (default for all environments)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://findme_user:grouptwo@localhost:5432/findme_db')
    # Disable SQLAlchemy event system for performance
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # CORS settings for frontend-backend communication
    CORS_HEADERS = 'Content-Type'

# Development environment config
class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = False

# Production environment config
class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
    # In production, require DATABASE_URL from environment
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

# Configuration dictionary for Flask app factory
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
