from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
import bcrypt
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)

    periods = db.relationship('Period', back_populates='user')

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email
        } 

    @hybrid_property
    def password_hash(self):
        raise AttributeError("password is not a readable attribute")

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    def __repr__(self):
        return f'<{self.id}: {self.email}>'

class Period(db.Model, SerializerMixin):
    __tablename__ = 'periods'

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date)
    notes = db.Column(db.String)

    symptoms = db.relationship('Symptom', secondary='periodsymptoms', back_populates='periods')
    user = db.relationship('User', back_populates='periods')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'start_date': self.start_date.isoformat(), 
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'notes': self.notes,
        }

    def validate_dates(self):
        if self.start_date > self.end_date:
            raise ValueError("start date must be before end date")

    def __repr__(self):
        return f'Period <{self.id}: {self.start_date} through {self.end_date}. notes: {self.notes}>'

class Symptom(db.Model, SerializerMixin):
    __tablename__ = 'symptoms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    severity = db.Column(db.Integer)

    periods = db.relationship('Period', secondary='periodsymptoms', back_populates='symptoms')

    def validate_severity(self):
        if self.severity not in [1, 2, 3, 4, 5]:
            raise ValueError("Severity must be 1-5")

    def __repr__(self):
        return f'Symptom <{self.id}: {self.name}>'

class PeriodSymptom(db.Model, SerializerMixin):
    __tablename__ = 'periodsymptoms'

    id = db.Column(db.Integer, primary_key=True)
    severity = db.Column(db.String)
    notes = db.Column(db.String)

    period_id = db.Column(db.Integer, db.ForeignKey('periods.id'))
    symptom_id = db.Column(db.Integer, db.ForeignKey('symptoms.id'))