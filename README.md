# Mindojo Test

This project implements a full-stack application utilising React for the frontend and FastAPI for the backend to solve a task challenge involving Breadth-First Search (BFS). The application allows users to visualise the grids from the google spreadsheet and result (number of cells and coordinates) in a user-friendly interface.

## Prerequisites

Make sure you have the following installed:

- Node.js (version 20.17.0)
- Python (version 3.11.4)

## Backend Setup

Please ensure the service account file is located in the `server/src` directory before starting the dev server

```bash
cd server/src
pipenv install
pipenv run fastapi dev app.py
```

## Frontend Setup

```bash
cd client
npm install
npm run dev
```
