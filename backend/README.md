# Backend
This folder contains the API and database logic for the Job Application Tracker.
- Main API code: <code>app/</code>
- Database: <code>job_tracker.db</code>
-Scripts:
    - <code>reset_db.py</code> - Resets the database (deletes all data)
    - <code>seed_db.py</code> - Populate database with example data
-Tests: <code>test_api.py</code> - Run with
        ```bash
        pytest -v
        ```
For setup, running, and API usage, see the root README.