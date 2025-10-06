# Contributing to Payroll Calculator & Payslip Generator

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Simple-Payroll-Calculator-Payslip-Generator.git
   cd Simple-Payroll-Calculator-Payslip-Generator
   ```

2. **Set Up Development Environment**
   - Follow the [SETUP_GUIDE.md](SETUP_GUIDE.md) to set up your local environment
   - Ensure all tests pass before making changes

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## Development Guidelines

### Code Style

#### Backend (Node.js)
- Use ES6+ features
- Follow existing code structure (MVC pattern)
- Use async/await for asynchronous operations
- Add JSDoc comments for functions
- Keep functions focused and single-purpose
- Use meaningful variable and function names

**Example:**
```javascript
/**
 * Calculate pro-rated salary based on attendance
 * @param {number} basicSalary - Base salary amount
 * @param {number} workingDays - Total working days in month
 * @param {number} daysPresent - Days employee was present
 * @returns {number} Pro-rated salary amount
 */
static calculateProRatedSalary(basicSalary, workingDays, daysPresent) {
  const dailyRate = basicSalary / workingDays;
  return dailyRate * daysPresent;
}
```

#### Frontend (React)
- Use functional components with hooks
- Follow component composition pattern
- Keep components small and reusable
- Use PropTypes or TypeScript for type checking (if added)
- Follow existing naming conventions

**Example:**
```javascript
const EmployeeForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
  };
  
  return (
    // JSX
  );
};
```

#### Database
- Use parameterized queries (never string concatenation)
- Add appropriate indexes for performance
- Document schema changes
- Include rollback SQL for migrations

### Project Structure

When adding new features, maintain the existing structure:

```
backend/src/
├── config/         - Configuration files
├── controllers/    - Request handlers (business logic)
├── models/         - Data access layer (database queries)
├── routes/         - API route definitions
├── middlewares/    - Express middlewares
├── migrations/     - Database migrations
└── utils/          - Utility functions

frontend/src/
├── components/     - Reusable UI components
├── pages/          - Page components
├── services/       - API service layer
└── styles/         - CSS stylesheets
```

### Adding New Features

#### 1. Backend API Endpoint

Create a new endpoint by following these steps:

**Step 1: Create Model** (`backend/src/models/YourModel.js`)
```javascript
const pool = require('../config/database');
const logger = require('../utils/logger');

class YourModel {
  static async create(data) {
    try {
      const result = await pool.query(
        'INSERT INTO your_table (...) VALUES (...) RETURNING *',
        [...]
      );
      logger.info('Record created');
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating record:', error);
      throw error;
    }
  }
}

module.exports = YourModel;
```

**Step 2: Create Controller** (`backend/src/controllers/yourController.js`)
```javascript
const YourModel = require('../models/YourModel');
const logger = require('../utils/logger');

class YourController {
  /**
   * @swagger
   * /api/your-endpoint:
   *   post:
   *     summary: Description
   *     tags: [YourTag]
   *     ...
   */
  static async yourMethod(req, res) {
    try {
      const result = await YourModel.create(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      logger.error('Error in yourMethod:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = YourController;
```

**Step 3: Create Routes** (`backend/src/routes/yourRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const YourController = require('../controllers/yourController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

const validationRules = [
  body('field').notEmpty().withMessage('Field is required')
];

router.post('/', validationRules, validate, YourController.yourMethod);

module.exports = router;
```

**Step 4: Register Routes** (in `backend/src/server.js`)
```javascript
const yourRoutes = require('./routes/yourRoutes');
app.use('/api/your-endpoint', yourRoutes);
```

#### 2. Frontend Component

**Create Component** (`frontend/src/components/YourComponent.js`)
```javascript
import React, { useState, useEffect } from 'react';
import { yourAPI } from '../services/api';

const YourComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await yourAPI.getAll();
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Your Component</h2>
      {/* Component content */}
    </div>
  );
};

export default YourComponent;
```

**Add API Service** (in `frontend/src/services/api.js`)
```javascript
export const yourAPI = {
  getAll: () => api.get('/your-endpoint'),
  create: (data) => api.post('/your-endpoint', data),
};
```

### Database Migrations

When adding new tables or modifying schema:

1. **Update schema.sql** with new changes
2. **Document changes** in DATABASE_SCHEMA.md
3. **Test migration** on fresh database
4. **Provide rollback** instructions

### Logging

Add appropriate logging for all operations:

```javascript
// Info level - normal operations
logger.info('Employee created:', employeeCode);

// Warn level - unexpected but handled
logger.warn('Duplicate entry attempted');

// Error level - errors that need attention
logger.error('Database connection failed:', error);
```

### API Documentation

Update Swagger documentation for all new endpoints:

```javascript
/**
 * @swagger
 * /api/endpoint:
 *   post:
 *     summary: Brief description
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success message
 */
```

## Testing

Currently, the project does not have automated tests. When contributing:

1. **Manual Testing**: Test all functionality thoroughly
2. **Edge Cases**: Test with invalid inputs, boundary values
3. **Database**: Verify database changes don't break existing data
4. **API**: Test all API endpoints with various inputs
5. **UI**: Test frontend on multiple browsers and screen sizes

### Testing Checklist

- [ ] Code runs without errors
- [ ] API endpoints return correct responses
- [ ] Database operations work correctly
- [ ] Frontend displays data properly
- [ ] Forms validate inputs correctly
- [ ] Error messages are user-friendly
- [ ] Logging captures relevant information
- [ ] No sensitive data in logs
- [ ] Performance is acceptable

## Pull Request Process

1. **Update Documentation**
   - Update README.md if adding features
   - Update API_DOCUMENTATION.md for API changes
   - Update DATABASE_SCHEMA.md for schema changes

2. **Commit Messages**
   - Use clear, descriptive commit messages
   - Follow format: `[type]: description`
   - Types: feat, fix, docs, style, refactor, test, chore

   **Examples:**
   ```
   feat: Add employee bulk upload feature
   fix: Correct salary calculation for partial months
   docs: Update API documentation for new endpoints
   refactor: Simplify payroll calculation logic
   ```

3. **Create Pull Request**
   - Provide clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes
   - List any breaking changes

4. **Review Process**
   - Address review comments
   - Keep PR focused (one feature/fix per PR)
   - Ensure all checks pass

## Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, Node version, database version
6. **Screenshots**: If applicable
7. **Logs**: Relevant error logs

## Feature Requests

When requesting features:

1. **Use Case**: Describe the problem you're solving
2. **Proposed Solution**: Your suggested implementation
3. **Alternatives**: Any alternative solutions considered
4. **Additional Context**: Screenshots, mockups, examples

## Code Review Guidelines

When reviewing code:

- ✅ Check for code quality and style consistency
- ✅ Verify functionality works as described
- ✅ Look for potential bugs or edge cases
- ✅ Check for security issues (SQL injection, XSS, etc.)
- ✅ Ensure proper error handling
- ✅ Verify logging is appropriate
- ✅ Check for performance issues
- ✅ Ensure documentation is updated

## Resources

- [Project README](README.md)
- [Setup Guide](SETUP_GUIDE.md)
- [API Documentation](backend/API_DOCUMENTATION.md)
- [Database Schema](backend/DATABASE_SCHEMA.md)
- [Quick Start](QUICK_START.md)

## Questions?

If you have questions:

1. Check existing documentation
2. Search existing issues
3. Create a new issue with your question

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers this project.

---

Thank you for contributing to the Payroll Calculator & Payslip Generator! 🎉
