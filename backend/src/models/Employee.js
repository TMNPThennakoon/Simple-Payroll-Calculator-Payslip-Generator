const pool = require('../config/database');
const logger = require('../utils/logger');

class Employee {
  static async create(employeeData) {
    const { employee_code, first_name, last_name, email, phone, designation, department, date_of_joining } = employeeData;
    
    try {
      const result = await pool.query(
        `INSERT INTO employees (employee_code, first_name, last_name, email, phone, designation, department, date_of_joining)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [employee_code, first_name, last_name, email, phone, designation, department, date_of_joining]
      );
      
      logger.info(`Employee created: ${employee_code}`);
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating employee:', error);
      throw error;
    }
  }

  static async findAll(status = 'active') {
    try {
      const result = await pool.query(
        'SELECT * FROM employees WHERE status = $1 ORDER BY created_at DESC',
        [status]
      );
      return result.rows;
    } catch (error) {
      logger.error('Error fetching employees:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM employees WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error fetching employee:', error);
      throw error;
    }
  }

  static async update(id, employeeData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(employeeData).forEach(key => {
      if (employeeData[key] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(employeeData[key]);
        paramCount++;
      }
    });

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    try {
      const result = await pool.query(
        `UPDATE employees SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
        values
      );
      
      logger.info(`Employee updated: ${id}`);
      return result.rows[0];
    } catch (error) {
      logger.error('Error updating employee:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      await pool.query('DELETE FROM employees WHERE id = $1', [id]);
      logger.info(`Employee deleted: ${id}`);
      return true;
    } catch (error) {
      logger.error('Error deleting employee:', error);
      throw error;
    }
  }
}

module.exports = Employee;
