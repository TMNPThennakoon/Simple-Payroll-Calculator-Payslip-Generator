const express = require('express');
const router = express.Router();
const PayrollController = require('../controllers/payrollController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

// Validation rules
const payrollValidation = [
  body('employee_id').isInt().withMessage('Valid employee ID is required'),
  body('month').isInt({ min: 1, max: 12 }).withMessage('Valid month (1-12) is required'),
  body('year').isInt({ min: 2000 }).withMessage('Valid year is required'),
  body('working_days').isInt({ min: 1 }).withMessage('Valid working days is required'),
  body('days_present').isInt({ min: 0 }).withMessage('Valid days present is required')
];

router.post('/calculate', payrollValidation, validate, PayrollController.calculatePayroll);
router.get('/:employeeId/:month/:year', PayrollController.getPayslip);
router.get('/period/:month/:year', PayrollController.getPayrollByPeriod);
router.put('/:id/payment-status', validate, PayrollController.updatePaymentStatus);

module.exports = router;
