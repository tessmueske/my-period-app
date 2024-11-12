#!/usr/bin/env python3

from flask import Flask, request, session, jsonify, render_template
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import MetaData
from flask_restful import Resource, Api
from flask_bcrypt import Bcrypt

from config import app, db, api
from models import User, Period, Symptom, PeriodSymptom 

bcrypt = Bcrypt()
CORS(app, supports_credentials=True)

app.secret_key = 'jgfklfjgds5437958397'

class Signup(Resource):

    @classmethod
    def options(cls):
        return '', 200

    def post(self):
        data = request.get_json()

        print(request.data)

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

    @classmethod
    def options(cls):
        return '', 200

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

    def put(self, period_id):

        my_period = Period.query.filter_by(id=period_id).first()

        if not my_period:
            return {'error': 'Period not found'}, 404

        data = request.get_json()

        start_date = data.get('start_date')
        end_date = data.get('end_date')
        notes = data.get('notes')

        if start_date:
            try:
                my_period.start_date = datetime.fromisoformat(start_date)
            except ValueError:
                return {'error': 'Invalid start date format'}, 422
        
        if end_date:
            try:
                my_period.end_date = datetime.fromisoformat(end_date)
            except ValueError:
                return {'error': 'Invalid end date format'}, 422

        if notes is not None: 
            my_period.notes = notes

        if end_date and start_date and my_period.start_date > my_period.end_date:
            return {'error': 'Start date must be before end date'}, 400
        
        try:
            db.session.commit()
            return {
                'id': my_period.id,
                'start_date': my_period.start_date.isoformat(),
                'end_date': my_period.end_date.isoformat() if my_period.end_date else None,
                'notes': my_period.notes
            }, 200

        except Exception as e:
            db.session.rollback()
            return {'error': 'Internal server error'}, 500

    def delete(self, period_id):

        if 'user_id' not in session:
            return {'error': 'Unauthorized request'}, 401 

        my_period = Period.query.filter_by(id=period_id).first()

        if my_period:
            db.session.delete(my_period)
            db.session.commit()
            return '', 204  

        return {'error': 'Period not found'}, 404

class Symptoms(Resource):

    def get(self, period_id):

        period_symptoms = PeriodSymptom.query.filter_by(period_id=period_id).all()
        if period_symptoms:
            symptoms = [
                period.to_dict() for period in period_symptoms
            ]
            return symptoms, 200
        else:
            return {'error': 'No symptoms found for this period'}, 404

    def post(self):
        if 'user_id' not in session:
            return {'error': 'Unauthorized request'}, 401
        
        user = User.query.get(session['user_id'])
        if not user:
            return {'error': 'Unauthorized request'}, 401

        data = request.get_json()

        severity = data.get('severity')
        name = data.get('name')
        period_id = data.get('period_id')

        period = Period.query.get(period_id)
        if not period:
            return {'error': 'period not found'}, 404

        try:
            symptom = Symptom(
                name=name,
                severity=severity,
            )

            db.session.add(symptom)
            db.session.commit()  

            period_symptom = PeriodSymptom(
                period_id=period.id,
                symptom_id=symptom.id, 
                name=name,
                severity=severity
            )

            db.session.add(period_symptom)
            db.session.commit()  

            return {
                'id': symptom.id,
                'name': symptom.name,
                'severity': symptom.severity,
            }, 201

        except Exception as e:
            db.session.rollback()  
            print(f"Error occurred: {e}")
            return {'error': 'Internal server error'}, 500

    def delete(self, period_id, symptom_id):
        if 'user_id' not in session:
            return {'error': 'Unauthorized request'}, 401

        try:
            period_symptom = PeriodSymptom.query.filter_by(period_id=period_id).first()
            if not period_symptom:
                return {'error': 'Symptom not found'}, 404
        
            symptom_id = period_symptom.symptom_id
        
            db.session.delete(period_symptom)

            symptom = Symptom.query.get(symptom_id)
            if symptom:
                db.session.delete(symptom)

            db.session.commit()
            return '', 204

        except Exception as e:
            db.session.rollback()
            print(f"Error occurred: {e}")
            return {'error': 'Internal server error'}, 500


class MySymptom(Resource):

    def get(self, symptom_id):

        symptom = Symptom.query.filter_by(id=symptom_id).first()

        if symptom:
            return {
                "symptom": symptom.name,
                "severity": symptom.severity
            }

        else:
            return {'error': 'Internal server error'}, 500

    def put(self, symptom_id):
        
        symptom = Symptom.query.filter_by(id=symptom_id).first()

        data = request.get_json()

        if symptom:
            severity = data.get('severity')
            symptom.severity = severity
            db.session.commit()
            return { "severity": symptom.severity }, 201

        else:
            return {"Error"}

class Logout(Resource):

    def delete(self):
        session.pop('user_id', None)
        return '', 204

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(AllPeriods, '/all_periods', endpoint='all_periods')
api.add_resource(NewPeriod, '/add_period', endpoint='add_period')
api.add_resource(MyPeriod, '/selected_period/<int:period_id>', endpoint='selected_period')
api.add_resource(MyPeriod, '/periods/<int:period_id>/edit', methods=['PUT'], endpoint='selected_period_edit')
api.add_resource(MyPeriod, '/periods/<int:period_id>', endpoint='selected_period_delete')
api.add_resource(Symptoms, '/add_symptom', endpoint='add_symptom')
api.add_resource(Symptoms, '/periods/<int:period_id>/symptoms', endpoint='symptoms')
api.add_resource(Symptoms, '/periods/<int:period_id>/symptoms/<int:symptom_id>/delete', endpoint='delete_symptom')
api.add_resource(Logout, '/logout', endpoint='logout')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

if __name__ == '__main__':
    app.run(port=5555, debug=False)