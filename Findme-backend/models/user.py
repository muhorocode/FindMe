from .db import db, bcrypt
import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    # this is the user id, it uniquely identifies each user
    id = db.Column(db.Integer, primary_key=True)
    
    # the user's name as provided during registration
    name = db.Column(db.String(100), nullable=False)
    
    # the user's email, must be unique
    email = db.Column(db.String(120), unique=True, nullable=False)
    
    # hashed password stored for security (never save raw passwords)
    password_hash = db.Column(db.String(200), nullable=False)
    
    # auto-saves the date and time this user was created
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # turns a raw password into a secure hash
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        
    # checks if a given password matches the saved hash
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    # converts the user object into a simple dictionary for json responses
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
