from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
import os

#import configuration
from config import config

#import databse and models
from models.missing_person import db

def create_app(config_name='development'):
    app=Flask(__name__)
    #load configuration
    app.config.from_object(config[config_name])
    #initialize extensions
    CORS(app)#enable CORS for react frontend
    db.init_app(app)#initialize sqlalchemy
    migrate=Migrate(app,db)#initialize flask-migrate

    #creation of all db tables(handled by postresql)

    with app.app_context():
        db.create_all()

    #register routes


    @app.route('/')
    def home():
        return jsonify({
            "message":"FindMe- Missing Persons Reporting API",
            "description":"Community-driven platform for reporting and tracking missing persons",
            "endpoints":{
                "health":"/api/health",
                "missing_persons":"/api/missing",
                "specific_person":"/api/missing/<id>"
            }
        })

    @app.route('/api/health')
    def health_check():
        #test db connection
        try:
            db.session.execute(db.text('SELECT 1'))
            db_status="connected"
        except Exception as e:
            db_status=f"error: {str(e)}"

        return jsonify({
            "status":"healthy",
            "database":db_status,
            "message":"API is running"
        })

    return app

if __name__=='__main__':
    app=create_app('development')
    app.run(debug=True, port=5000)