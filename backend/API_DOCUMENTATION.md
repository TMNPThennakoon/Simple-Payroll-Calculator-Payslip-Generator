# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Swagger/OpenAPI Documentation
Interactive API documentation is available at: `http://localhost:5000/api-docs`

## Authentication
Currently, the API does not require authentication. Future versions will implement JWT-based authentication.

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Endpoints

### 1. Employees API

#### Create Employee
- **URL**: `/api/employees`
- **Method**: `POST`
- **Body**:
```json
{
  "employee_code": "EMP001",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "designation": "Software Engineer",
  "department": "IT",
  "date_of_joining": "2024-01-01"
}
```
- **Success Response**: 201 Created
```json
{
  "success": true,
  "data": {
    "id": 1,
    "employee_code": "EMP001",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "status": "active",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get All Employees
- **URL**: `/api/employees?status=active`
- **Method**: `GET`
- **Query Parameters**:
  - `status` (optional): active | inactive (default: active)
- **Success Response**: 200 OK

#### Get Employee by ID
- **URL**: `/api/employees/:id`
- **Method**: `GET`
- **Success Response**: 200 OK

#### Update Employee
- **URL**: `/api/employees/:id`
- **Method**: `PUT`
- **Body**: Same as create (all fields optional)
- **Success Response**: 200 OK

#### Delete Employee
- **URL**: `/api/employees/:id`
- **Method**: `DELETE`
- **Success Response**: 200 OK

### 2. Salary Structure API

#### Create Salary Structure
- **URL**: `/api/salary`
- **Method**: `POST`
- **Body**:
```json
{
  "employee_id": 1,
  "basic_salary": 50000.00,
  "house_rent_allowance": 10000.00,
  "transport_allowance": 5000.00,
  "medical_allowance": 3000.00,
  "other_allowances": 2000.00,
  "provident_fund_percentage": 10.00,
  "tax_percentage": 15.00,
  "effective_from": "2024-01-01"
}
```
- **Success Response**: 201 Created

#### Get Salary Structure by Employee
- **URL**: `/api/salary/employee/:employeeId`
- **Method**: `GET`
- **Success Response**: 200 OK

#### Update Salary Structure
- **URL**: `/api/salary/:id`
- **Method**: `PUT`
- **Body**: Same as create (all fields optional)
- **Success Response**: 200 OK

### 3. Payroll API

#### Calculate Payroll
- **URL**: `/api/payroll/calculate`
- **Method**: `POST`
- **Body**:
```json
{
  "employee_id": 1,
  "month": 1,
  "year": 2024,
  "working_days": 30,
  "days_present": 28
}
```
- **Success Response**: 201 Created
```json
{
  "success": true,
  "data": {
    "id": 1,
    "employee_id": 1,
    "month": 1,
    "year": 2024,
    "working_days": 30,
    "days_present": 28,
    "basic_salary": "46666.67",
    "gross_salary": "63466.67",
    "total_deductions": "15866.67",
    "net_salary": "47600.00",
    "payment_status": "pending"
  }
}
```

#### Get Payslip
- **URL**: `/api/payroll/:employeeId/:month/:year`
- **Method**: `GET`
- **Example**: `/api/payroll/1/1/2024`
- **Success Response**: 200 OK

#### Get Payroll by Period
- **URL**: `/api/payroll/period/:month/:year`
- **Method**: `GET`
- **Example**: `/api/payroll/period/1/2024`
- **Success Response**: 200 OK

#### Update Payment Status
- **URL**: `/api/payroll/:id/payment-status`
- **Method**: `PUT`
- **Body**:
```json
{
  "status": "paid",
  "payment_date": "2024-01-31"
}
```
- **Success Response**: 200 OK

## Status Codes

- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input or validation error
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Validation Rules

### Employee
- `employee_code`: Required, unique
- `first_name`: Required
- `last_name`: Required
- `email`: Required, valid email format, unique
- `date_of_joining`: Required, valid date

### Salary Structure
- `employee_id`: Required, must be valid employee ID
- `basic_salary`: Required, must be positive number
- `effective_from`: Required, valid date

### Payroll Calculation
- `employee_id`: Required, must be valid employee ID
- `month`: Required, 1-12
- `year`: Required, >= 2000
- `working_days`: Required, >= 1
- `days_present`: Required, >= 0, <= working_days

## Error Handling

All errors are logged to the backend logs directory:
- `backend/logs/error.log`: Error-level logs
- `backend/logs/combined.log`: All logs

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting in production.

## Examples Using curl

### Create Employee
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"employee_code":"EMP001","first_name":"John","last_name":"Doe","email":"john@example.com","date_of_joining":"2024-01-01"}'
```

### Get All Employees
```bash
curl http://localhost:5000/api/employees
```

### Calculate Payroll
```bash
curl -X POST http://localhost:5000/api/payroll/calculate \
  -H "Content-Type: application/json" \
  -d '{"employee_id":1,"month":1,"year":2024,"working_days":30,"days_present":28}'
```

### Get Payslip
```bash
curl http://localhost:5000/api/payroll/1/1/2024
```
