#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource
from werkzeug.security import generate_password_hash

# Local imports
from config import app, db, api
from models import User, Period, Symptom, PeriodSymptom

app.secret_key = 'my_project_123'

class Signup(Resource):
    def post(self):
        data = request.get_json()

        email = data.get('email')
        password = data.get('password') 

        errors = []

        if not email:
            errors.append("email is required")
        if not password: 
            errors.append("password is required")
        if errors:
            return {"errors": errors}, 400 

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return {"errors": ["email already exists"]}, 409

        new_user = User(email=email)
        new_user.password_hash = password 

        try:
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(), 201
        except Exception as e:
            return {"error": f"failed to create user: {str(e)}"}, 422

class Login(Resource):
    def post(self):

        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id

            return {
                'id': user.id,
                'email': user.email
            }, 200

        else:
            return {'error': 'invalid email or password'}, 401

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

class AllPeriods(Resource):
    
    def get(self):
        if 'user_id' not in session or session['user_id'] is None:
            return {'error': 'Unauthorized'}, 401

        user_id = session['user_id']
        periods = Period.query.filter_by(user_id=user_id).all()
        return [period.to_dict() for period in periods], 200

class NewPeriod(Resource):

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
            return {'error': 'internal server error'}, 500

        return {
            'start_date': period.start_date,
            'end_date': period.end_date
        }, 201


class MyPeriod(Resource):
    def get(self, period_id):

        my_period = Period.query.filter_by(id=period_id).first()

        if my_period:
            return {
                'id': my_period.id,
                'start_date': my_period.start_date,
                'end_date': my_period.end_date,
            }, 200

        else:
            return {'error': 'Period not found'}, 404


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
api.add_resource(AllPeriods, '/all_periods', endpoint='all_periods')
api.add_resource(NewPeriod, '/new_period', endpoint='new_period')
api.add_resource(MyPeriod, '/selected_period/<int:period_id>', endpoint='selected_period')
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

