# Setup Guide for Payroll Calculator & Payslip Generator

This guide will walk you through setting up the complete application from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/downloads)
- **npm** or **yarn** package manager

## Step 1: Clone the Repository

```bash
git clone https://github.com/TMNPThennakoon/Simple-Payroll-Calculator-Payslip-Generator.git
cd Simple-Payroll-Calculator-Payslip-Generator
```

## Step 2: Database Setup

### Install PostgreSQL

1. Download and install PostgreSQL from the official website
2. During installation, remember the password you set for the `postgres` user
3. Verify installation:
```bash
psql --version
```

### Create Database

Open PostgreSQL command line (psql) or pgAdmin and execute:

```bash
# On Linux/Mac
psql -U postgres

# On Windows (use Command Prompt or PowerShell)
psql -U postgres -W
```

Then create the database:
```sql
CREATE DATABASE payroll_db;
```

Verify the database was created:
```sql
\l
```

Exit psql:
```sql
\q
```

## Step 3: Backend Setup

### Navigate to Backend Directory
```bash
cd backend
```

### Install Dependencies
```bash
npm install
```

This will install all required packages:
- express
- pg (PostgreSQL client)
- dotenv
- cors
- winston (logging)
- swagger-jsdoc & swagger-ui-express
- express-validator
- nodemon (dev dependency)

### Configure Environment Variables

Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

Edit the `.env` file with your database credentials:
```env
PORT=5000
NODE_ENV=development

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=payroll_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Logging
LOG_LEVEL=info
```

**Important**: Replace `your_postgres_password` with your actual PostgreSQL password.

### Run Database Migrations

Execute the migration script to create all tables:
```bash
npm run migrate
```

Expected output:
```
[timestamp] info: Starting database migrations...
[timestamp] info: Database connection established
[timestamp] info: Database migrations completed successfully
```

### Verify Database Schema

Connect to the database and verify tables were created:
```bash
psql -U postgres -d payroll_db
```

List all tables:
```sql
\dt
```

You should see:
- employees
- salary_structure
- payroll_records
- attendance

Describe a table:
```sql
\d employees
```

Exit psql:
```sql
\q
```

### Start Backend Server

For development (with auto-reload):
```bash
npm run dev
```

For production:
```bash
npm start
```

Expected output:
```
[timestamp] info: Server is running on port 5000
[timestamp] info: API Documentation available at http://localhost:5000/api-docs
```

### Verify Backend

1. Health check:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status":"OK","message":"Server is running"}
```

2. Open Swagger documentation in browser:
```
http://localhost:5000/api-docs
```

## Step 4: Frontend Setup

Open a new terminal window/tab.

### Navigate to Frontend Directory
```bash
cd frontend
```

### Install Dependencies
```bash
npm install
```

This will install:
- react
- react-dom
- react-scripts
- axios
- react-router-dom

### Configure Environment Variables

Create a `.env` file in the frontend directory:
```bash
cp .env.example .env
```

The default configuration should work:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Start Frontend Development Server
```bash
npm start
```

The application will automatically open in your browser at:
```
http://localhost:3000
```

Expected output:
```
Compiled successfully!

You can now view payroll-calculator-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

## Step 5: Test the Application

### 1. Add an Employee

1. Navigate to "Employees" page
2. Fill in the employee form:
   - Employee Code: EMP001
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@example.com
   - Designation: Software Engineer
   - Department: IT
   - Date of Joining: 2024-01-01
3. Click "Add Employee"
4. Verify the employee appears in the employee list

### 2. Create Salary Structure

1. Navigate to "Salary Structure" page
2. Select the employee you just created
3. Fill in salary details:
   - Basic Salary: 50000
   - House Rent Allowance: 10000
   - Transport Allowance: 5000
   - Medical Allowance: 3000
   - Provident Fund %: 10
   - Tax %: 15
   - Effective From: 2024-01-01
4. Click "Create Salary Structure"

### 3. Calculate Payroll

1. Navigate to "Payroll & Payslips" page
2. In the "Calculate Payroll" section:
   - Select Employee: EMP001 - John Doe
   - Month: January
   - Year: 2024
   - Working Days: 30
   - Days Present: 28
3. Click "Calculate Payroll"
4. Note the calculated net salary

### 4. View Payslip

1. In the "View Payslip" section:
   - Select Employee: EMP001 - John Doe
   - Month: January
   - Year: 2024
2. Click "View Payslip"
3. Review the detailed payslip with earnings and deductions
4. Click "Print Payslip" to print or save as PDF

## Step 6: Testing with API (Optional)

### Using curl

Test API endpoints directly:

```bash
# Get all employees
curl http://localhost:5000/api/employees

# Create employee
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employee_code": "EMP002",
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane.smith@example.com",
    "designation": "HR Manager",
    "department": "HR",
    "date_of_joining": "2024-01-15"
  }'
```

### Using Postman

1. Import the API endpoints from Swagger documentation
2. Test each endpoint individually

## Troubleshooting

### Backend Issues

#### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: 
- Ensure PostgreSQL is running: `sudo service postgresql status`
- Check database credentials in `.env` file
- Verify database exists: `psql -U postgres -l`

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
- Change PORT in backend `.env` file
- Or stop the process using port 5000: `lsof -ti:5000 | xargs kill`

#### Migration Fails
**Solution**:
- Check database connection settings
- Ensure database user has CREATE TABLE permissions
- Drop and recreate the database if needed

### Frontend Issues

#### API Connection Error
```
Network Error / Cannot connect to backend
```
**Solution**:
- Ensure backend server is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Check browser console for CORS errors

#### Port 3000 Already in Use
**Solution**:
- Use a different port: `PORT=3001 npm start`
- Or stop the process: `lsof -ti:3000 | xargs kill`

## Next Steps

1. **Add More Employees**: Test with multiple employees
2. **Calculate Payroll**: Process payroll for different months
3. **Generate Reports**: Export payslips as needed
4. **Customize**: Modify salary components based on your requirements
5. **Deploy**: Follow deployment guides for production deployment

## Support

For issues and questions:
- Check the main README.md
- Review API_DOCUMENTATION.md
- Check DATABASE_SCHEMA.md
- Open an issue on GitHub

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2: `pm2 start src/server.js`
3. Set up Nginx as reverse proxy
4. Use environment-specific database

### Frontend
1. Build production bundle: `npm run build`
2. Serve with Nginx, Apache, or CDN
3. Update API URL to production backend

## Security Checklist

- [ ] Change default database passwords
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS in production
- [ ] Implement authentication and authorization
- [ ] Set up database backups
- [ ] Configure firewall rules
- [ ] Enable rate limiting
- [ ] Validate and sanitize all inputs

Congratulations! Your Payroll Calculator & Payslip Generator is now set up and running! 🎉
