#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import db, User, Period, Symptom, PeriodSymptom

class Signup(Resource):
    def post(self):

        data = request.get_json()

        username = data.get('username')
        password_hash = data.get('password')

        new_user = User(username=username)
        new_user.password_hash=password_hash

        try:
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(), 201

        except Exception as e: 
            return {"error": f"Failed to create user: {str(e)}"}, 422

class Login(Resource):
    def post(self):

        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id

            return {
                'id': user.id,
                'username': user.username
            }, 200

        else:
            return {'error': 'Invalid username or password'}, 401

class CheckSession(Resource):
    def get(self):

        if 'user_id' not in session or session['user_id'] is None:
            return {"error": "Unauthorized"}, 401

        user_id = session['user_id']
        user = db.session.get(User, user_id)

        if user:
            return user.to_dict(), 200
        else:
            return {"error": "User not found"}, 404

class Periods(Resource):
    def get(self):

        if 'user_id' not in session or session['user_id'] is None:
            return {'error': 'Unauthorized'}, 401

        user_id = session['user_id']
        periods = Period.query.filter_by(user_id=user_id).all()
        return [period.to_dict() for period in periods], 200

    def post(self):
        if 'user_id' not in session:
            return {'error': 'Unauthorized request'}, 401
        
        user = User.query.get(session['user_id'])
        if not user:
            return {'error': 'Unauthorized request'}, 401

        data = request.get_json()
        
        try:
            period = Period(
                start_date=data['start_date'],
                end_date=data['end_date'],
                user_id=user.id
            )
            db.session.add(period)
            db.session.commit()
        except ValueError as e:
            return {'error': str(e)}, 422
        except Exception as e:
            return {'error': 'Internal server error'}, 500

        return {
            'start_date': period.start_date,
            'end_date': period.end_date
        }, 201


class Symptoms(Resource):
    # TODO: Implement Symptoms functionality later
    pass

class Logout(Resource):
    def delete(self):

        if 'user_id' in session and session['user_id'] is not None:
            session.pop('user_id', None)
            return '', 204 
        else:
            return {'error': 'Unauthorized request'}, 401

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Periods, '/all_periods', endpoint='all_periods')
api.add_resource(Logout, '/logout', endpoint='logout')

# app.py is your Flask application. You'll want to use Flask to build a simple API backend like we have in previous modules. You should use Flask-RESTful for your routes. You should be familiar with models.py and seed.py by now, but remember that you will need to use Flask-SQLAlchemy, Flask-Migrate, and SQLAlchemy-Serializer instead of SQLAlchemy and Alembic in your models.

#build out routes in flask-restful -- authentication, IAM, server-comms

if __name__ == '__main__':
    app.run(port=5555, debug=True)

