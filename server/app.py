#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import db, User, Period, Symptom, PeriodSymptom

class Home(Resource):
    return ''

class Signup(Resource):
    return ''

class Login(Resource):
    return ''

class CheckSession(Resource):
    return ''

class Logout(Resource):
    return ''

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

# app.py is your Flask application. You'll want to use Flask to build a simple API backend like we have in previous modules. You should use Flask-RESTful for your routes. You should be familiar with models.py and seed.py by now, but remember that you will need to use Flask-SQLAlchemy, Flask-Migrate, and SQLAlchemy-Serializer instead of SQLAlchemy and Alembic in your models.

#build out routes in flask-restful -- authentication, IAM, server-comms


if __name__ == '__main__':
    app.run(port=5555, debug=True)

