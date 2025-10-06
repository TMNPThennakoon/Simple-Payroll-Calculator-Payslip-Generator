# Database Schema Documentation

## Database: payroll_db
**RDBMS**: PostgreSQL

## Tables

### 1. employees
Stores employee information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique employee identifier |
| employee_code | VARCHAR(50) | UNIQUE, NOT NULL | Employee code/number |
| first_name | VARCHAR(100) | NOT NULL | Employee first name |
| last_name | VARCHAR(100) | NOT NULL | Employee last name |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Employee email address |
| phone | VARCHAR(20) | | Employee phone number |
| designation | VARCHAR(100) | | Job designation |
| department | VARCHAR(100) | | Department name |
| date_of_joining | DATE | NOT NULL | Date when employee joined |
| status | VARCHAR(20) | DEFAULT 'active' | Employee status (active/inactive) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record update timestamp |

**Indexes**:
- `idx_employees_code` on employee_code
- `idx_employees_status` on status

### 2. salary_structure
Stores salary structure for each employee.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique salary structure ID |
| employee_id | INTEGER | FOREIGN KEY → employees(id) | Reference to employee |
| basic_salary | DECIMAL(10,2) | NOT NULL | Basic salary amount |
| house_rent_allowance | DECIMAL(10,2) | DEFAULT 0 | House rent allowance |
| transport_allowance | DECIMAL(10,2) | DEFAULT 0 | Transport allowance |
| medical_allowance | DECIMAL(10,2) | DEFAULT 0 | Medical allowance |
| other_allowances | DECIMAL(10,2) | DEFAULT 0 | Other allowances |
| provident_fund_percentage | DECIMAL(5,2) | DEFAULT 0 | PF deduction percentage |
| tax_percentage | DECIMAL(5,2) | DEFAULT 0 | Tax deduction percentage |
| effective_from | DATE | NOT NULL | Date from which structure is effective |
| effective_to | DATE | | Date until structure is effective |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record update timestamp |

**Foreign Keys**:
- `employee_id` REFERENCES employees(id) ON DELETE CASCADE

**Indexes**:
- `idx_salary_structure_employee` on employee_id

### 3. payroll_records
Stores calculated payroll for each employee per month.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique payroll record ID |
| employee_id | INTEGER | FOREIGN KEY → employees(id) | Reference to employee |
| salary_structure_id | INTEGER | FOREIGN KEY → salary_structure(id) | Reference to salary structure used |
| month | INTEGER | NOT NULL, CHECK (1-12) | Payroll month |
| year | INTEGER | NOT NULL | Payroll year |
| working_days | INTEGER | NOT NULL | Total working days in month |
| days_present | INTEGER | NOT NULL | Days employee was present |
| basic_salary | DECIMAL(10,2) | NOT NULL | Calculated basic salary |
| house_rent_allowance | DECIMAL(10,2) | DEFAULT 0 | Calculated HRA |
| transport_allowance | DECIMAL(10,2) | DEFAULT 0 | Calculated transport allowance |
| medical_allowance | DECIMAL(10,2) | DEFAULT 0 | Calculated medical allowance |
| other_allowances | DECIMAL(10,2) | DEFAULT 0 | Calculated other allowances |
| gross_salary | DECIMAL(10,2) | NOT NULL | Total gross salary |
| provident_fund | DECIMAL(10,2) | DEFAULT 0 | PF deduction amount |
| tax_deduction | DECIMAL(10,2) | DEFAULT 0 | Tax deduction amount |
| other_deductions | DECIMAL(10,2) | DEFAULT 0 | Other deductions |
| total_deductions | DECIMAL(10,2) | DEFAULT 0 | Total deductions |
| net_salary | DECIMAL(10,2) | NOT NULL | Final net salary |
| payment_status | VARCHAR(20) | DEFAULT 'pending' | Payment status (pending/processed/paid) |
| payment_date | DATE | | Date of payment |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record update timestamp |

**Foreign Keys**:
- `employee_id` REFERENCES employees(id) ON DELETE CASCADE
- `salary_structure_id` REFERENCES salary_structure(id)

**Unique Constraints**:
- UNIQUE(employee_id, month, year) - One payroll record per employee per month

**Indexes**:
- `idx_payroll_employee` on employee_id
- `idx_payroll_month_year` on (month, year)

### 4. attendance
Stores daily attendance records for employees.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique attendance record ID |
| employee_id | INTEGER | FOREIGN KEY → employees(id) | Reference to employee |
| attendance_date | DATE | NOT NULL | Attendance date |
| status | VARCHAR(20) | NOT NULL | Attendance status |
| remarks | TEXT | | Additional remarks |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |

**Foreign Keys**:
- `employee_id` REFERENCES employees(id) ON DELETE CASCADE

**Unique Constraints**:
- UNIQUE(employee_id, attendance_date) - One attendance record per employee per day

**Indexes**:
- `idx_attendance_employee` on employee_id
- `idx_attendance_date` on attendance_date

**Valid Status Values**:
- `present`: Employee was present
- `absent`: Employee was absent
- `half_day`: Employee worked half day
- `on_leave`: Employee was on leave

## Relationships

```
employees (1) ----< (N) salary_structure
employees (1) ----< (N) payroll_records
employees (1) ----< (N) attendance
salary_structure (1) ----< (N) payroll_records
```

## ER Diagram

```
┌─────────────┐
│  employees  │
└─────┬───────┘
      │
      │ 1:N
      │
      ├────────┐────────┐────────┐
      │        │        │        │
      ▼        ▼        ▼        ▼
┌─────────────┐ ┌──────────┐ ┌──────────┐
│   salary    │ │ payroll  │ │attendance│
│  structure  │ │ records  │ │          │
└─────┬───────┘ └──────────┘ └──────────┘
      │
      │ 1:N
      │
      ▼
┌─────────────┐
│  payroll    │
│  records    │
└─────────────┘
```

## Salary Calculation Logic

### Pro-rated Salary Calculation
```
Daily Rate = Basic Salary / Working Days
Pro-rated Basic = Daily Rate × Days Present

Similarly for each allowance:
Pro-rated Allowance = (Allowance / Working Days) × Days Present
```

### Gross Salary
```
Gross Salary = Basic Salary + HRA + Transport Allowance + Medical Allowance + Other Allowances
```

### Deductions
```
Provident Fund = Gross Salary × (PF Percentage / 100)
Tax Deduction = Gross Salary × (Tax Percentage / 100)
Total Deductions = PF + Tax + Other Deductions
```

### Net Salary
```
Net Salary = Gross Salary - Total Deductions
```

## Database Constraints

1. **Referential Integrity**: All foreign keys have ON DELETE CASCADE to maintain data consistency
2. **Unique Constraints**: Prevent duplicate employee codes, emails, and payroll records
3. **Check Constraints**: Ensure valid values (e.g., month 1-12, status enum values)
4. **Default Values**: Provide sensible defaults for optional fields

## Migration Instructions

1. Ensure PostgreSQL is installed and running
2. Create database: `CREATE DATABASE payroll_db;`
3. Run migration script: `npm run migrate` from backend directory
4. Verify tables: `\dt` in psql

## Sample Data

### Insert Sample Employee
```sql
INSERT INTO employees (employee_code, first_name, last_name, email, designation, department, date_of_joining)
VALUES ('EMP001', 'John', 'Doe', 'john.doe@example.com', 'Software Engineer', 'IT', '2024-01-01');
```

### Insert Sample Salary Structure
```sql
INSERT INTO salary_structure (employee_id, basic_salary, house_rent_allowance, transport_allowance, 
                               medical_allowance, provident_fund_percentage, tax_percentage, effective_from)
VALUES (1, 50000.00, 10000.00, 5000.00, 3000.00, 10.00, 15.00, '2024-01-01');
```

## Backup & Restore

### Backup
```bash
pg_dump -U postgres payroll_db > payroll_backup.sql
```

### Restore
```bash
psql -U postgres payroll_db < payroll_backup.sql
```

## Performance Considerations

- Indexes are created on frequently queried columns
- Appropriate data types used to optimize storage
- Normalized structure to reduce data redundancy
- Foreign key constraints with cascading deletes for data integrity
