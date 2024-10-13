from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt
from config import db

bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)

    periods = db.relationship('Period', back_populates='user')

    serialize_rules = ('-periods.user',)

    @hybrid_property
    def password_hash(self):
        raise AttributeError("password is not a readable attribute")

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

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

    serialize_rules = ('-user.periods', '-symptoms.periods')

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

    serialize_rules = ('-periods.symptoms',)

    def validate_severity(self):
        if self.severity not in [1, 2, 3, 4, 5]:
            raise ValueError("severity must be 1-5")

    def __repr__(self):
        return f'Symptom <{self.id}: {self.name}>'

class PeriodSymptom(db.Model, SerializerMixin):
    __tablename__ = 'periodsymptoms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    severity = db.Column(db.Integer)
    notes = db.Column(db.String)

    serialize_rules = ('-period', '-symptom')

    period_id = db.Column(db.Integer, db.ForeignKey('periods.id'))
    symptom_id = db.Column(db.Integer, db.ForeignKey('symptoms.id'))

    period = db.relationship('Period', backref=db.backref('periodsymptoms', cascade="all, delete-orphan"))
    symptom = db.relationship('Symptom', backref=db.backref('periodsymptoms', cascade="all, delete-orphan"))