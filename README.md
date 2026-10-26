# Student Assessment and Result Management System

## Project Overview

This is a basic full-stack web application for managing student assessments and academic results.

Teachers can enter student details and subject marks, view calculated results, and delete student records.

## Technologies Used

- React.js
- Node.js
- Express.js
- CSS
- REST API
- Git and GitHub

## Features

1. Add student records.
2. View student marks and results.
3. Calculate total marks and percentage automatically.
4. Determine pass or fail status.
5. Delete student records.
6. Validate marks and prevent duplicate roll numbers.

## Subjects

- Python
- React
- Database Management

Each subject has a maximum of 100 marks. Students must score at least 35 marks in each subject to pass.

## How to Run

### Backend

```bash
cd backend
npm install
npm start
```

The backend runs on port 5000.

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL provided by Vite.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Get all student records |
| POST | `/api/students` | Add a student |
| DELETE | `/api/students/:id` | Delete a student |

## Frontend and Backend Communication

The React frontend sends HTTP requests to the Express backend. The backend processes the requests and returns JSON responses.

## Current Limitation

Student records are stored temporarily in memory. A database can be added in a future version.

## Learning Outcomes

This project demonstrates React state management, REST API integration, backend development, result calculation, and basic full-stack application design.
