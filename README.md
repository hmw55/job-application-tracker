# Job Application Tracker

A simple, local-first, full stack web application for tracking job applications, interviews, and offers.

This project is being built incrementally to demostrate backend (Python/FastAPI), database (SQLite), and frontend (React) skills.

## Project Structure
- <code>backend/</code> - The API and database logic (FastAPI + SQLite)
- <code>frontend/</code> - UI code (soon to be developed)
- <code>.gitignore</code> - Files/folders to ignore in Git
- <code>README.md</code> - This file

## Getting Started

### Prerequisites
- Python 3.13
- pip or virtual environment support
- SQLite (default database)

### Running the Backend
1. Go to the backend folder:
    ```bash
    cd backend
    ```
2. Create and activate a virtual environment:
    - Linux/macOS:
        ```bash
        python -m venv venv && source venv/bin/activate
        ```
    - Windows:
        ```bash
        python -m venv venv && venv\Scripts\activate
        ```
3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4. Initialize the database (this will delete the existing data):
    ```bash
    python reset_db.py
    ```
5. Optionally, seed the database with example data:
    ```bash
    python seed_db.py
    ```
6. Start the API server:
    ```bash
    uvicorn app.main:app --reload
    ```
7. Access the API at http://127/0.0.1:8000
8. Interactive API docs are available at http://127/0.0.1:8000/docs

### Testing
- Run tests using:
    ```bash
    pytest -v
    ```
- Test use an in-memory database, so they are sage to run anytime

### API Endpoints
#### Companies
- <code>GET /api/comanies</code> - Lists all companies
- <code>GET /api/companies/{id}</code> - Get a single company
- <code>POST /api/comanies</code> - Create a new company
- <code>PUT /api/companies/{id}</code> - Update a company
- <code>DELETE /api/companies/{id}</code> - Delete a company

#### Jobs
- <code>GET /api/jobs</code> - List all jobs
- <code>GET /api/jobs/{id}</code> - Get a single job
- <code>POST /api/jobs</code> - Create a new job
- <code>PUT /api/jobs/{id}</code> - Update a job
- <code>DELETE /api/jobs/{id}</code> - Delete a job

### Notes
- <code>reset_db.py</code> deletes all existing data.
- <code>seed_db.py</code> adds example companies and jobs.
- FastAPI automatically generated interactive documentation at <code>/docs</code>