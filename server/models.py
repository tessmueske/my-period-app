from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<{self.id}: {self.username}>'

class Period(db.Model, SerializerMixin):
    __tablename__ = 'periods'

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)

class Symptom(db.Model, SerializerMixin):
    __tablename__ = 'symptoms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

class PeriodSymptom(db.Model, SerializerMixin):
    __tablename__ = 'periodsymptoms'

    id = db.Column(db.Integer, primary_key=True)
    severity = db.Column(db.String)
    notes = db.Column(db.String)


# Import your models as needed in other modules, i.e. from models import ....

# Remember to regularly run flask db revision --autogenerate -m'<descriptive message>', replacing <descriptive message> with an appropriate message, and flask db upgrade head to track your modifications to the database and create checkpoints in case you ever need to roll those modifications back.

