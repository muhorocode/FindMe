from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db=SQLAlchemy()


class MissingPerson(db.Model):
    #model for missing person report
    __tablename__='missing_persons'

    #primary key
    id=db.Column(db.Integer, primary_key=True)

    #personal info
    full_name=db.Column(db.String(100), nullable=False)
    age=db.Column(db.Integer, nullable=False)
    gender=db.Column(db.String(20), nullable=False)

    #physical description
    height=db.Column(db.String(20))
    weight=db.Column(db.String(20))
    hair_color=db.Column(db.String(50))
    eye_color=db.Column(db.String(50))
    distinguishing_features=db.Column(db.Text)

    #last know information
    last_seen_date=db.Column(db.DateTime, nullable=False)
    last_seen_location=db.Column(db.String(200), nullable=False)
    last_seen_wearing=db.Column(db.Text)

    #contact information
    contact_name=db.Column(db.String(100),nullable=False)
    contact_phone=db.Column(db.String(20), nullable=False)
    contact_email=db.Column(db.String(100))


    #case information
    status=db.Column(db.String(20), default='missing')
    case_number=db.Column(db.String(50), unique=True)
    additional_info=db.Column(db.Text)

    #photo url
    photo_url=db.Column(db.String(300))

    #timestamps
    created_at=db.Column(db.DateTime, default=datetime.utcnow)
    updated_at=db.Column(db.DateTime, default=datetime.utcnow,onupdate=datetime.utcnow)

    def __init__(self, **kwargs):
        """
        Custom initializer to allow creation from keyword arguments.
        This lets you do: MissingPerson(**data)
        """
        for field in kwargs:
            if hasattr(self, field):
                setattr(self, field, kwargs[field])

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "age": self.age,
            "gender": self.gender,
            "height": self.height,
            "weight": self.weight,
            "hair_color": self.hair_color,
            "eye_color": self.eye_color,
            "distinguishing_features": self.distinguishing_features,
            "last_seen_date": self.last_seen_date.isoformat() if self.last_seen_date else None,
            "last_seen_location": self.last_seen_location,
            "last_seen_wearing": self.last_seen_wearing,
            "contact_name": self.contact_name,
            "contact_phone": self.contact_phone,
            "contact_email": self.contact_email,
            "status": self.status,
            "case_number": self.case_number,
            "additional_info": self.additional_info,
            "photo_url": self.photo_url,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
    
    def __repr__(self):
        return f'<MissingPerson {self.full_name} - Case {self.case_number}>'
