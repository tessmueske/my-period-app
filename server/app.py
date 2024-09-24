#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# app.py is your Flask application. You'll want to use Flask to build a simple API backend like we have in previous modules. You should use Flask-RESTful for your routes. You should be familiar with models.py and seed.py by now, but remember that you will need to use Flask-SQLAlchemy, Flask-Migrate, and SQLAlchemy-Serializer instead of SQLAlchemy and Alembic in your models.


if __name__ == '__main__':
    app.run(port=5555, debug=True)

