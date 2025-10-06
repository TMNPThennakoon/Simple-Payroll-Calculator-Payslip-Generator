# Quick Start Guide

Get the Payroll Calculator & Payslip Generator running in 5 minutes!

## Prerequisites

- Node.js installed
- PostgreSQL installed
- Terminal/Command Prompt

## Quick Setup

### 1. Clone & Navigate
```bash
git clone https://github.com/TMNPThennakoon/Simple-Payroll-Calculator-Payslip-Generator.git
cd Simple-Payroll-Calculator-Payslip-Generator
```

### 2. Database Setup
```bash
# Create database
psql -U postgres -c "CREATE DATABASE payroll_db;"
```

### 3. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your PostgreSQL password
npm run migrate
npm run dev
```

### 4. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm start
```

### 5. Access Application
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:5000/api-docs
- **API Health**: http://localhost:5000/health

## Quick Test

### Add Employee (API)
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employee_code": "EMP001",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "designation": "Software Engineer",
    "department": "IT",
    "date_of_joining": "2024-01-01"
  }'
```

### Create Salary Structure (API)
```bash
curl -X POST http://localhost:5000/api/salary \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": 1,
    "basic_salary": 50000,
    "house_rent_allowance": 10000,
    "transport_allowance": 5000,
    "medical_allowance": 3000,
    "provident_fund_percentage": 10,
    "tax_percentage": 15,
    "effective_from": "2024-01-01"
  }'
```

### Calculate Payroll (API)
```bash
curl -X POST http://localhost:5000/api/payroll/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": 1,
    "month": 1,
    "year": 2024,
    "working_days": 30,
    "days_present": 28
  }'
```

### View Payslip (Browser)
```
http://localhost:5000/api/payroll/1/1/2024
```

## Using the Web Interface

1. **Navigate to http://localhost:3000**
2. **Add Employee**: Go to "Employees" → Fill form → Submit
3. **Set Salary**: Go to "Salary Structure" → Select employee → Fill details → Submit
4. **Calculate Payroll**: Go to "Payroll & Payslips" → Calculate Payroll section → Fill details → Calculate
5. **View Payslip**: Same page → View Payslip section → Select employee & period → View

## Troubleshooting

### Database Connection Error
```bash
# Check if PostgreSQL is running
sudo service postgresql status
# or on Windows
# Check Services for PostgreSQL

# Restart if needed
sudo service postgresql restart
```

### Port Already in Use
```bash
# Backend (port 5000)
lsof -ti:5000 | xargs kill

# Frontend (port 3000)
lsof -ti:3000 | xargs kill
```

### Migration Fails
```bash
# Drop and recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS payroll_db;"
psql -U postgres -c "CREATE DATABASE payroll_db;"
npm run migrate
```

## File Locations

### Configuration Files
- Backend: `backend/.env`
- Frontend: `frontend/.env`

### Logs
- Error logs: `backend/logs/error.log`
- All logs: `backend/logs/combined.log`

### Database
- Schema: `backend/src/migrations/schema.sql`
- Migrations: `backend/src/migrations/runMigrations.js`

## Common Commands

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with hot reload
npm run migrate    # Run database migrations
```

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## API Endpoints Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| GET | /api-docs | API documentation |
| POST | /api/employees | Create employee |
| GET | /api/employees | Get all employees |
| POST | /api/salary | Create salary structure |
| POST | /api/payroll/calculate | Calculate payroll |
| GET | /api/payroll/:id/:month/:year | Get payslip |

## Default Credentials

No authentication is currently implemented. All endpoints are publicly accessible.

## Need More Help?

- Full documentation: `README.md`
- Detailed setup: `SETUP_GUIDE.md`
- API reference: `backend/API_DOCUMENTATION.md`
- Database schema: `backend/DATABASE_SCHEMA.md`
- Project overview: `PROJECT_SUMMARY.md`

## Next Steps

1. ✅ Read the SETUP_GUIDE.md for detailed instructions
2. ✅ Explore API documentation at http://localhost:5000/api-docs
3. ✅ Review DATABASE_SCHEMA.md to understand data structure
4. ✅ Test all features through the web interface
5. ✅ Customize for your specific requirements

---

**That's it! You're ready to use the Payroll Calculator! 🚀**
