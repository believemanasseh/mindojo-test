# Mindojo Test

## Prerequisites

Make sure you have the following installed:

- Node.js (version 20.17.0)
- Python (version 3.11.4)

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

## Backend Setup

Please ensure the service account file is located in the `server/src` directory before starting the dev server

```bash
cd server/src
pipenv install
pipenv run fastapi dev app.py
```
