const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

// Validation rules
const employeeValidation = [
  body('employee_code').notEmpty().withMessage('Employee code is required'),
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('date_of_joining').isDate().withMessage('Valid date of joining is required')
];

router.post('/', employeeValidation, validate, EmployeeController.createEmployee);
router.get('/', EmployeeController.getAllEmployees);
router.get('/:id', EmployeeController.getEmployeeById);
router.put('/:id', validate, EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);

module.exports = router;
