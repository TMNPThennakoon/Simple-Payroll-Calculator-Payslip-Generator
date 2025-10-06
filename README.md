# Simple Payroll Calculator & Payslip Generator

A comprehensive full-stack web application for managing employee payroll, calculating salaries, and generating payslips. Built with React.js frontend, Node.js backend, and PostgreSQL database.

## 🚀 Features

- **Employee Management**: Add, view, update, and manage employee information
- **Salary Structure Management**: Configure salary components including basic salary, allowances, and deductions
- **Payroll Calculation**: Calculate monthly payroll based on attendance and salary structure
- **Payslip Generation**: Generate and view detailed payslips
- **API Documentation**: Comprehensive Swagger/OpenAPI documentation
- **Logging System**: Winston-based logging for all actions and errors
- **RDBMS**: PostgreSQL database with proper schema and relationships

## 📋 Requirements

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🏗️ Project Structure

```
.
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Database and Swagger configuration
│   │   ├── controllers/    # API controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Express middlewares
│   │   ├── migrations/     # Database migrations
│   │   ├── utils/          # Utility functions (logger)
│   │   └── server.js       # Express server entry point
│   ├── logs/               # Application logs
│   └── package.json
│
└── frontend/               # React.js frontend
    ├── public/
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   ├── services/       # API service layer
    │   ├── styles/         # CSS styles
    │   ├── App.js          # Main App component
    │   └── index.js        # React entry point
    └── package.json
```

## 🗄️ Database Schema

### Tables

1. **employees**: Employee information
   - id, employee_code, first_name, last_name, email, phone, designation, department, date_of_joining, status

2. **salary_structure**: Employee salary components
   - id, employee_id, basic_salary, allowances, deductions, effective_from, effective_to

3. **payroll_records**: Monthly payroll calculations
   - id, employee_id, month, year, working_days, days_present, earnings, deductions, net_salary

4. **attendance**: Employee attendance records
   - id, employee_id, attendance_date, status, remarks

## 🚀 Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure your database credentials in `.env`:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=payroll_db
DB_USER=postgres
DB_PASSWORD=your_password
```

5. Create the database:
```bash
psql -U postgres
CREATE DATABASE payroll_db;
\q
```

6. Run database migrations:
```bash
npm run migrate
```

7. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend server will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Start the React development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 📚 API Documentation

Once the backend is running, access the interactive API documentation at:
```
http://localhost:5000/api-docs
```

### Main API Endpoints

#### Employees
- `POST /api/employees` - Create new employee
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

#### Salary Structure
- `POST /api/salary` - Create salary structure
- `GET /api/salary/employee/:employeeId` - Get salary by employee
- `PUT /api/salary/:id` - Update salary structure

#### Payroll
- `POST /api/payroll/calculate` - Calculate payroll
- `GET /api/payroll/:employeeId/:month/:year` - Get payslip
- `GET /api/payroll/period/:month/:year` - Get all payroll for period
- `PUT /api/payroll/:id/payment-status` - Update payment status

## 📝 Logging

The application uses Winston for comprehensive logging:

- **Console logs**: All logs with color coding
- **Error logs**: `backend/logs/error.log`
- **Combined logs**: `backend/logs/combined.log`

Log levels: error, warn, info, debug

## 🧪 Usage Example

### 1. Add an Employee
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

### 2. Create Salary Structure
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

### 3. Calculate Payroll
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

## 🔒 Security Features

- Input validation using express-validator
- SQL injection prevention through parameterized queries
- Error handling middleware
- CORS configuration
- Environment variable management

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm start  # Starts React dev server with hot reload
```

## 📦 Production Build

### Frontend
```bash
cd frontend
npm run build
```

The optimized production build will be in the `frontend/build` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

Developed with ❤️ for efficient payroll management

## 🐛 Known Issues & Future Enhancements

- [ ] Add user authentication and authorization
- [ ] Implement role-based access control
- [ ] Add email notifications for payslip generation
- [ ] Implement bulk payroll processing
- [ ] Add data export features (PDF, Excel)
- [ ] Implement leave management system
- [ ] Add dashboard with analytics and charts