const PayrollRecord = require('../models/PayrollRecord');
const SalaryStructure = require('../models/SalaryStructure');
const logger = require('../utils/logger');

class PayrollController {
  /**
   * @swagger
   * /api/payroll/calculate:
   *   post:
   *     summary: Calculate payroll for an employee
   *     tags: [Payroll]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               employee_id:
   *                 type: integer
   *               month:
   *                 type: integer
   *               year:
   *                 type: integer
   *               working_days:
   *                 type: integer
   *               days_present:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Payroll calculated successfully
   *       404:
   *         description: Salary structure not found
   *       500:
   *         description: Server error
   */
  static async calculatePayroll(req, res) {
    try {
      const { employee_id, month, year, working_days, days_present } = req.body;

      // Get employee's salary structure
      const salaryStructure = await SalaryStructure.findByEmployeeId(employee_id);
      if (!salaryStructure) {
        return res.status(404).json({ 
          success: false, 
          error: 'Salary structure not found for employee' 
        });
      }

      // Calculate pro-rated salary based on days present
      const dailyRate = parseFloat(salaryStructure.basic_salary) / working_days;
      const basicSalary = dailyRate * days_present;

      // Calculate allowances (pro-rated)
      const houseRentAllowance = (parseFloat(salaryStructure.house_rent_allowance) / working_days) * days_present;
      const transportAllowance = (parseFloat(salaryStructure.transport_allowance) / working_days) * days_present;
      const medicalAllowance = (parseFloat(salaryStructure.medical_allowance) / working_days) * days_present;
      const otherAllowances = (parseFloat(salaryStructure.other_allowances) / working_days) * days_present;

      // Calculate gross salary
      const grossSalary = basicSalary + houseRentAllowance + transportAllowance + 
                         medicalAllowance + otherAllowances;

      // Calculate deductions
      const providentFund = (grossSalary * parseFloat(salaryStructure.provident_fund_percentage)) / 100;
      const taxDeduction = (grossSalary * parseFloat(salaryStructure.tax_percentage)) / 100;
      const totalDeductions = providentFund + taxDeduction;

      // Calculate net salary
      const netSalary = grossSalary - totalDeductions;

      const payrollData = {
        employee_id,
        salary_structure_id: salaryStructure.id,
        month,
        year,
        working_days,
        days_present,
        basic_salary: basicSalary.toFixed(2),
        house_rent_allowance: houseRentAllowance.toFixed(2),
        transport_allowance: transportAllowance.toFixed(2),
        medical_allowance: medicalAllowance.toFixed(2),
        other_allowances: otherAllowances.toFixed(2),
        gross_salary: grossSalary.toFixed(2),
        provident_fund: providentFund.toFixed(2),
        tax_deduction: taxDeduction.toFixed(2),
        other_deductions: 0,
        total_deductions: totalDeductions.toFixed(2),
        net_salary: netSalary.toFixed(2)
      };

      const payrollRecord = await PayrollRecord.create(payrollData);
      logger.info(`Payroll calculated for employee: ${employee_id}, month: ${month}/${year}`);
      
      res.status(201).json({ success: true, data: payrollRecord });
    } catch (error) {
      logger.error('Error in calculatePayroll controller:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/payroll/{employeeId}/{month}/{year}:
   *   get:
   *     summary: Get payslip for an employee
   *     tags: [Payroll]
   *     parameters:
   *       - in: path
   *         name: employeeId
   *         required: true
   *         schema:
   *           type: integer
   *       - in: path
   *         name: month
   *         required: true
   *         schema:
   *           type: integer
   *       - in: path
   *         name: year
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Payslip details
   *       404:
   *         description: Payslip not found
   *       500:
   *         description: Server error
   */
  static async getPayslip(req, res) {
    try {
      const { employeeId, month, year } = req.params;
      const payslip = await PayrollRecord.findByEmployeeAndPeriod(employeeId, month, year);
      
      if (!payslip) {
        return res.status(404).json({ success: false, error: 'Payslip not found' });
      }
      
      res.status(200).json({ success: true, data: payslip });
    } catch (error) {
      logger.error('Error in getPayslip controller:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/payroll/period/{month}/{year}:
   *   get:
   *     summary: Get all payroll records for a period
   *     tags: [Payroll]
   *     parameters:
   *       - in: path
   *         name: month
   *         required: true
   *         schema:
   *           type: integer
   *       - in: path
   *         name: year
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: List of payroll records
   *       500:
   *         description: Server error
   */
  static async getPayrollByPeriod(req, res) {
    try {
      const { month, year } = req.params;
      const payrolls = await PayrollRecord.findByPeriod(month, year);
      res.status(200).json({ success: true, data: payrolls });
    } catch (error) {
      logger.error('Error in getPayrollByPeriod controller:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/payroll/{id}/payment-status:
   *   put:
   *     summary: Update payment status
   *     tags: [Payroll]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               status:
   *                 type: string
   *                 enum: [pending, processed, paid]
   *               payment_date:
   *                 type: string
   *                 format: date
   *     responses:
   *       200:
   *         description: Payment status updated
   *       500:
   *         description: Server error
   */
  static async updatePaymentStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, payment_date } = req.body;
      
      const payroll = await PayrollRecord.updatePaymentStatus(id, status, payment_date);
      logger.info(`Payment status updated for payroll: ${id}`);
      
      res.status(200).json({ success: true, data: payroll });
    } catch (error) {
      logger.error('Error in updatePaymentStatus controller:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = PayrollController;
