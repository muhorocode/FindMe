import os
from datetime import timedelta

class Config:
    #get the absolute path to the backend directory(BASE CONFIGURATION)
    BASE_DIR=os.path.abspath(os.path.dirname(__file__))

    #postgresql db configuration
    SQLALCHEMY_DATABASE_URI=os.getenv(
        'DATABASE_URL',
        'postgresql://findme_user:grouptwo@localhost:5432/findme_db'


    )
    SQLALCHEMY_TRACK_MODIFICATIONS=False

    #secret key for sessions
    SECRET_KEY=os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

    #CORS settings
    CORS_HEADERS='Content-Type'

class DevelopmentConfig(Config):
    #development configuration
    DEBUG=True
    TESTING=False

class ProductionConfig(Config):
    #production configuration

    DEBUG=True
    TESTING=False
    #use of environment variable in production mode
    SQLALCHEMY_DATABASE_URI=os.getenv('DATABASE_URL')
#configuration dictionary
config={
    'development':DevelopmentConfig,
    'production':ProductionConfig,
    'default':DevelopmentConfig
}

    