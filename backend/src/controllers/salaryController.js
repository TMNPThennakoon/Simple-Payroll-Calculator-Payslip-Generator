const SalaryStructure = require('../models/SalaryStructure');
const logger = require('../utils/logger');

class SalaryController {
  /**
   * @swagger
   * /api/salary:
   *   post:
   *     summary: Create salary structure for an employee
   *     tags: [Salary]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               employee_id:
   *                 type: integer
   *               basic_salary:
   *                 type: number
   *               house_rent_allowance:
   *                 type: number
   *               transport_allowance:
   *                 type: number
   *               medical_allowance:
   *                 type: number
   *               other_allowances:
   *                 type: number
   *               provident_fund_percentage:
   *                 type: number
   *               tax_percentage:
   *                 type: number
   *               effective_from:
   *                 type: string
   *                 format: date
   *     responses:
   *       201:
   *         description: Salary structure created
   *       500:
   *         description: Server error
   */
  static async createSalaryStructure(req, res) {
    try {
      const salaryStructure = await SalaryStructure.create(req.body);
      logger.info(`Salary structure created for employee: ${req.body.employee_id}`);
      res.status(201).json({ success: true, data: salaryStructure });
    } catch (error) {
      logger.error('Error in createSalaryStructure controller:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/salary/employee/{employeeId}:
   *   get:
   *     summary: Get current salary structure for an employee
   *     tags: [Salary]
   *     parameters:
   *       - in: path
   *         name: employeeId
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Salary structure details
   *       404:
   *         description: Salary structure not found
   *       500:
   *         description: Server error
   */
  static async getSalaryByEmployee(req, res) {
    try {
      const salaryStructure = await SalaryStructure.findByEmployeeId(req.params.employeeId);
      if (!salaryStructure) {
        return res.status(404).json({ success: false, error: 'Salary structure not found' });
      }
      res.status(200).json({ success: true, data: salaryStructure });
    } catch (error) {
      logger.error('Error in getSalaryByEmployee controller:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/salary/{id}:
   *   put:
   *     summary: Update salary structure
   *     tags: [Salary]
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
   *     responses:
   *       200:
   *         description: Salary structure updated
   *       500:
   *         description: Server error
   */
  static async updateSalaryStructure(req, res) {
    try {
      const salaryStructure = await SalaryStructure.update(req.params.id, req.body);
      logger.info(`Salary structure updated: ${req.params.id}`);
      res.status(200).json({ success: true, data: salaryStructure });
    } catch (error) {
      logger.error('Error in updateSalaryStructure controller:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = SalaryController;
