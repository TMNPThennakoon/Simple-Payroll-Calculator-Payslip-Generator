const Employee = require('../models/Employee');
const logger = require('../utils/logger');

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - employee_code
 *         - first_name
 *         - last_name
 *         - email
 *         - date_of_joining
 *       properties:
 *         id:
 *           type: integer
 *         employee_code:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         designation:
 *           type: string
 *         department:
 *           type: string
 *         date_of_joining:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [active, inactive]
 */

class EmployeeController {
  /**
   * @swagger
   * /api/employees:
   *   post:
   *     summary: Create a new employee
   *     tags: [Employees]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Employee'
   *     responses:
   *       201:
   *         description: Employee created successfully
   *       400:
   *         description: Invalid input
   *       500:
   *         description: Server error
   */
  static async createEmployee(req, res) {
    try {
      const employee = await Employee.create(req.body);
      logger.info(`Employee created via API: ${employee.employee_code}`);
      res.status(201).json({ success: true, data: employee });
    } catch (error) {
      logger.error('Error in createEmployee controller:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/employees:
   *   get:
   *     summary: Get all employees
   *     tags: [Employees]
   *     parameters:
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [active, inactive]
   *         description: Filter by employee status
   *     responses:
   *       200:
   *         description: List of employees
   *       500:
   *         description: Server error
   */
  static async getAllEmployees(req, res) {
    try {
      const status = req.query.status || 'active';
      const employees = await Employee.findAll(status);
      res.status(200).json({ success: true, data: employees });
    } catch (error) {
      logger.error('Error in getAllEmployees controller:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/employees/{id}:
   *   get:
   *     summary: Get employee by ID
   *     tags: [Employees]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Employee details
   *       404:
   *         description: Employee not found
   *       500:
   *         description: Server error
   */
  static async getEmployeeById(req, res) {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ success: false, error: 'Employee not found' });
      }
      res.status(200).json({ success: true, data: employee });
    } catch (error) {
      logger.error('Error in getEmployeeById controller:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/employees/{id}:
   *   put:
   *     summary: Update employee
   *     tags: [Employees]
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
   *             $ref: '#/components/schemas/Employee'
   *     responses:
   *       200:
   *         description: Employee updated successfully
   *       404:
   *         description: Employee not found
   *       500:
   *         description: Server error
   */
  static async updateEmployee(req, res) {
    try {
      const employee = await Employee.update(req.params.id, req.body);
      if (!employee) {
        return res.status(404).json({ success: false, error: 'Employee not found' });
      }
      logger.info(`Employee updated via API: ${req.params.id}`);
      res.status(200).json({ success: true, data: employee });
    } catch (error) {
      logger.error('Error in updateEmployee controller:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/employees/{id}:
   *   delete:
   *     summary: Delete employee
   *     tags: [Employees]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Employee deleted successfully
   *       500:
   *         description: Server error
   */
  static async deleteEmployee(req, res) {
    try {
      await Employee.delete(req.params.id);
      logger.info(`Employee deleted via API: ${req.params.id}`);
      res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
      logger.error('Error in deleteEmployee controller:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = EmployeeController;
