# Payroll Calculator & Payslip Generator

## Description

A full-stack application for managing payroll and generating payslips with user authentication, role-based access, and reporting.

## Features

- User authentication (register/login) with secure password hashing
- Role separation (admin and user)
- CRUD operations on employees and payrolls
- Payroll calculation based on hours and rate
- Daily and monthly reports exportable as CSV
- API documentation with Swagger
- Logging for actions and errors
- SQL injection prevention via ORM

## Tech Stack

- Frontend: React.js (SPA with routing)
- Backend: Node.js, Express.js
- Database: SQLite (RDBMS)
- Authentication: JWT
- ORM: Sequelize
- Logging: Winston
- API Docs: Swagger

## Setup Instructions

### Prerequisites

- Node.js installed
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

   The server will run on http://localhost:5000

   API documentation available at http://localhost:5000/api-docs

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

   The app will run on http://localhost:3000

## Usage

1. Register a new user (select admin for full access)
2. Login with your credentials
3. As admin, manage employees and payrolls
4. Generate and download reports

## Database Schema

- **Roles**: id, name
- **Users**: id, username, email, password (hashed), roleId
- **Employees**: id, name, email, position, hourlyRate, department
- **Payrolls**: id, employeeId, date, hoursWorked, grossPay, deductions, netPay
- **Payslips**: id, payrollId, generatedAt, pdfPath

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Role-based access control
- Input validation and SQL injection prevention

## Logging

Logs are stored in `backend/logs/` directory.

## Final Checklist

- [x] Admin can register/login and perform CRUD on entities
- [x] Passwords are hashed
- [x] Users can generate/download daily and monthly reports
- [x] API is documented
- [x] Server actions/errors are logged
- [x] Input validations are in place
- [x] App can be started locally following README