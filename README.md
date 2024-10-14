README.md for my Phase 4 Final Project

Crimson ~ For Queer People who Menstruate with Gender-Neutral Language
The mission is to create an app for users of all genders who menstruate that allows them to track their menstruation without gendered language about bodies or products.

I polled my Instagram followers about what language feels best for them regarding menstruation. It seems that both menstruation and period causes dysphoria for different people. Others prefer "bleeding", "monthly", or other various terms. Some people preferred using terms such as "on the rag" in a joking manner. I chose to call my project "Crimson" in hopes that it detracted from the focus solely on the words "menstruation" or "period", also adding a nudge to those who preferred words such as "bleeding". 

I chose a dark grey as the background color for my project because it emits the least amount of carbon. Other choices for colors were also made with this research in mind (dark red, for example). The source for this is https://consider.digital/low-carbon-web-colour-palettes/.

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
I can edit or delete the symptoms and periods.
I can retrieve a list of all of my periods and all of their symptoms (perhaps to see how it changes over time).


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

5. More components

--> filter? search bar? these should all maybe do a lot less and i should have more components overall
--> wireframe?

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

<!-- This README should serve as a template for your own- go through the important files in your project and describe what they do. Each file that you edit (you can ignore your migration files) should get at least a paragraph. Each function should get a small blurb.

You should descibe your application first, and with a good level of detail. The rest should be ordered by importance to the user. (Probably routes next, then models.)

Screenshots and links to resources that you used throughout are also useful to users and collaborators, but a little more syntactically complicated. Only add these in if you're feeling comfortable with Markdown. -->

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Potential future expansions:
Additional accessibiliy features
Filter by a symptom to see its prevalence (how many periods it is associated with)
Recommend Doctors
Surgery Information
Sex Education (STIs, contraception, etc)
Guest speakers/teach-ins - how to family-build in queer relationships, hormones and wanted/unwanted changes, queer history, etc
Meeting friends function
Dating function
Hookup function
Message/Chat groups (think Lex groups, Reddit threads)

