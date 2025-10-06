const express = require('express');
const router = express.Router();
const SalaryController = require('../controllers/salaryController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

// Validation rules
const salaryValidation = [
  body('employee_id').isInt().withMessage('Valid employee ID is required'),
  body('basic_salary').isFloat({ min: 0 }).withMessage('Valid basic salary is required'),
  body('effective_from').isDate().withMessage('Valid effective from date is required')
];

router.post('/', salaryValidation, validate, SalaryController.createSalaryStructure);
router.get('/employee/:employeeId', SalaryController.getSalaryByEmployee);
router.put('/:id', validate, SalaryController.updateSalaryStructure);

module.exports = router;
