from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    return ''

class Period(db.Model, SerializerMixin):
    return'

class Symptom(db.Model, SerializerMixin):
    return ''

class PeriodSymptom(db.Model, SerializerMixin):
    return ''


# Edit models.py and start creating your models. Import your models as needed in other modules, i.e. from models import ....

# Remember to regularly run flask db revision --autogenerate -m'<descriptive message>', replacing <descriptive message> with an appropriate message, and flask db upgrade head to track your modifications to the database and create checkpoints in case you ever need to roll those modifications back.

