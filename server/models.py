from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)

    periods = db.relationship('Period', back_populates='user')

    def __repr__(self):
        return f'<{self.id}: {self.username}>'

class Period(db.Model, SerializerMixin):
    __tablename__ = 'periods'

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)

    symptoms = db.relationship('Symptom', secondary='periodsymptoms', back_populates='periods')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'Period <{self.id}: {self.start_date} through {self.end_date}>'

class Symptom(db.Model, SerializerMixin):
    __tablename__ = 'symptoms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    periods = db.relationship('Period', secondary='periodsymptoms', back_populates='symptoms')

    def __repr__(self):
        return f'Symptom <{self.id}: {self.name}>'

class PeriodSymptom(db.Model, SerializerMixin):
    __tablename__ = 'periodsymptoms'

    id = db.Column(db.Integer, primary_key=True)
    severity = db.Column(db.String)
    notes = db.Column(db.String)

    period_id = db.Column(db.Integer, db.ForeignKey('periods.id'))
    symptom_id = db.Column(db.Integer, db.ForeignKey('symptoms.id'))


# Import your models as needed in other modules, i.e. from models import ....

# Remember to regularly run flask db revision --autogenerate -m'<descriptive message>', replacing <descriptive message> with an appropriate message, and flask db upgrade head to track your modifications to the database and create checkpoints in case you ever need to roll those modifications back.

