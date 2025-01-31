Calendar Application
Project Overview
This project is a Calendar Application that allows users to create, view, edit, and delete events/meetings on their personal calendar. The application consists of a Django backend and a React frontend.

Table of Contents
Project Overview

Prerequisites

Backend Setup (Django)

Frontend Setup (React)

Deployment

Prerequisites
Ensure you have the following installed on your machine:

Python (version 3.6+)

Node.js(version 12+)

npm or yarn

Git

Heroku CLI

Backend Setup (Django)
1. Clone the Repository
sh
git clone https://github.com/yourusername/calendar-app.git
cd calendar-app
2. Create a Virtual Environment
sh
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
3. Install Dependencies
sh
pip install -r requirements.txt
4. Configure Environment Variables
Create a .env file in the project root and add the following environment variables:

plaintext
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=your_database_url
5. Apply Migrations
sh
python manage.py migrate
6. Create a Superuser
sh
python manage.py createsuperuser
7. Run the Development Server
sh
python manage.py runserver
The backend should now be running at http://127.0.0.1:8000/.
