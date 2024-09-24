#!/usr/bin/env python3

from random import randint, choice as rc
import datetime

from faker import Faker
from app import app
from models import db, User, Period, Symptom, PeriodSymptom  

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        db.drop_all() 
        db.create_all() 

        users = [
            User(username='alienboyyy'),
            User(username='cien_rosas'),
            User(username='lotusmoon13')
        ]
        db.session.bulk_save_objects(users)
        db.session.commit()

        symptoms = [
            Symptom(name='Headache'),
            Symptom(name='Nausea'),
            Symptom(name='Fatigue'),
            Symptom(name='Dizziness'),
            Symptom(name='Back pain')
        ]
        db.session.bulk_save_objects(symptoms)
        db.session.commit()

        periods = [
            Period(start_date=datetime.date(2024, 1, 1), end_date=datetime.date(2024, 1, 10), user=users[0]),
            Period(start_date=datetime.date(2024, 2, 1), end_date=datetime.date(2024, 2, 10), user=users[1]),
            Period(start_date=datetime.date(2024, 3, 1), end_date=datetime.date(2024, 3, 10), user=users[2]) 
        ]
        db.session.bulk_save_objects(periods)
        db.session.commit()

        period_symptoms = [
            PeriodSymptom(severity='Mild', notes='Feeling somewhat tired', period_id=periods[0].id, symptom_id=symptoms[0].id),
            PeriodSymptom(severity='Moderate', notes='Some nausea', period_id=periods[1].id, symptom_id=symptoms[1].id),
            PeriodSymptom(severity='Severe', notes='Terrible headache', period_id=periods[2].id, symptom_id=symptoms[2].id),
        ]

        db.session.bulk_save_objects(period_symptoms)
        db.session.commit()

        print("Completed seed.")
