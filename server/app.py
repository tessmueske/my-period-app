#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import MetaData
from flask_restful import Resource, Api
from flask_bcrypt import Bcrypt

# Local imports
from config import app, db, api
from models import User, Period, Symptom, PeriodSymptom 

CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})

bcrypt = Bcrypt()

app.secret_key = 'jgfklfjgds5437958397'

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response

class Signup(Resource):

    def post(self):
        data = request.get_json()

        email = data.get('email')
        password = data.get('password') 

        errors = []

        if not email:
            errors.append("email is required.")
        if not password: 
            errors.append("password is required.")
        if errors:
            return {"errors": errors}, 400 

        user = User.query.filter_by(email=email).first()
        if user:
            return {"errors": ["email already registered. please log in."]}, 400
        
        new_user = User(email=email)
        new_user.password_hash = password 

        try:
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
 
        except Exception as e:
            return {"error": f"Failed to create user: {str(e)}"}, 422

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

        return {'error': 'invalid email or password'}, 401

class AllPeriods(Resource):

    def get(self):
        try:
            if 'user_id' not in session or session['user_id'] is None:
                return {'error': 'Unauthorized'}, 401

            user_id = session['user_id']
            periods = Period.query.filter_by(user_id=user_id).all()
            return [period.to_dict() for period in periods], 200

        except Exception as e:
            return {'error': str(e)}, 500  

class NewPeriod(Resource):

    def post(self):
        if 'user_id' not in session:
            return {'error': 'Unauthorized request'}, 401
        
        user = User.query.get(session['user_id'])
        if not user:
            return {'error': 'Unauthorized request'}, 401

        data = request.get_json()

        if 'start_date' not in data:
            return {'error': 'Start date is required'}, 400
        
        try:
            start_date = datetime.fromisoformat(data['start_date'])
            end_date = datetime.fromisoformat(data['end_date']) if 'end_date' in data else None

            if end_date and start_date > end_date:
                return {'error': 'Start date must be before end date'}, 400
            
            period = Period(
                start_date=start_date,
                end_date=end_date,
                notes=data.get('notes', ''),
                user_id=user.id
            )
            db.session.add(period)
            db.session.commit()

            return {
                'id': period.id,
                'start_date': period.start_date.isoformat(),
                'end_date': period.end_date.isoformat() if period.end_date else None,
                'notes': period.notes
            }, 201

        except ValueError:
            return {'error': 'Invalid date format'}, 422
        except Exception:
            db.session.rollback() 
            return {'error': 'Internal server error'}, 500

class MyPeriod(Resource):

    def get(self, period_id):
        my_period = Period.query.filter_by(id=period_id).first()

        if my_period:
            return {
                'id': my_period.id,
                'start_date': my_period.start_date.isoformat(), 
                'end_date': my_period.end_date.isoformat() if my_period.end_date else None,
            }, 200

        else:
            return {'error': 'Period not found'}, 404

class Symptoms(Resource):

    def post(self):
        if 'user_id' not in session:
            return {'error': 'Unauthorized request'}, 401
        
        user = User.query.get(session['user_id'])
        if not user:
            return {'error': 'Unauthorized request'}, 401

        data = request.get_json()

        severity = data.get('severity')
        notes = data.get('notes')
        
        try:
            symptom = Symptom(
                severity=severity,
                notes=notes,
                user_id=user.id
            )
            db.session.add(symptom)
            db.session.commit()

            return {
                'id': symptom.id,
                'severity': symptom.severity,
                'notes': symptom.notes
            }, 201

        except Exception as e:
            db.session.rollback() 
            print(f"Error occurred: {e}")
            return {'error': 'Internal server error'}, 500

class Logout(Resource):

    def delete(self):
        print(f"Session before logout: {session}")
        if 'user_id' in session and session['user_id'] is not None:
            session.pop('user_id', None)
            return '', 204 
        else:
            return {'error': 'Unauthorized request'}, 401

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(AllPeriods, '/all_periods', endpoint='all_periods')
api.add_resource(NewPeriod, '/add_period', endpoint='add_period')
api.add_resource(MyPeriod, '/selected_period/<int:period_id>', endpoint='selected_period')
api.add_resource(Symptoms, '/add_symptom', endpoint='add_symptom')
api.add_resource(Logout, '/logout', endpoint='logout')

# Run the application
if __name__ == '__main__':
    app.run(port=5555, debug=True)
