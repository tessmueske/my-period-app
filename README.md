README.md for my Phase 4 Final Project

Queer Health App ~ For Queer People who Menstruate with Gender-Neutral Language

Mission: to enable users of all genders who menstruate to access an app that allows them to track their menstruation without gendered language about bodies or products.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

[ BACKEND ]

Models:

1. User
- One User can have many periods (one-to-many)
- User has: id, username, password / periods (relationship)

2. Period
- A Period belongs to a User (many-to-one)
- A Period can have many symptoms (many-to-many)
- Period has: id, start date, end date / user_id (FK) / symptoms (relationship)

3. Symptom
- A Symptom can belong to many periods (many-to-many)
- A Symptom does not belong to one User, since symptoms are not unique to one person
- Symptom has: id, name / periods (relationship)

4. PeriodSymptom
- Association/joins table between Period and Symptom
- PeriodSymptom has: id, severity, notes, period_id (FK), symptom_id (FK)

User - Period: One user can have multiple periods (one-to-many)
Period - User: Each period belongs to one user (many-to-one)
Period - Symptom: Each period can have many symptoms, and each symptom can belong to many periods (many-to-many)

User Stories:

As a user, I can add period entries.
I can add symptoms to each period.
I can edit or delete the symptoms as well as the periods.
I can retrieve a list of all of my symptoms.
I can retrieve a list of all of my periods and all of their symptoms (perhaps to see how it changes over time).
I can filter by a symptom to see its prevalence (how many periods it is associated with).

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

[ FRONTEND ]

Components:

1. NavBar
- This is where a user can navigate between Home, My Periods, and My Symptoms. It lives at the top of the page.

2. Login
- This is where a user logs in with their username and password.

3. Home
- This is a static page with some information about the website and its purpose and mission.

4. PeriodSymptom
- This is where a user can see a list of their periods by cycle.
- This is where a user can add, edit, or delete a period.
- This is where a user can add, edit, or delete a symptom from a period.
- This is where a user can filter by symptom to see its prevalence.

--> filter? search bar? these should all maybe do a lot less and i should have more components overall
--> wireframe?

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Potential future expansions:
Recommend Doctors
Surgery Information
Sex Education (STIs, contraception, etc)
Guest speakers/teach-ins - how to family-build in queer relationships, hormones and wanted/unwanted changes, queer history, etc
Meeting friends function
Dating function
Hookup function
Message/Chat groups (think Lex groups, Reddit threads)
