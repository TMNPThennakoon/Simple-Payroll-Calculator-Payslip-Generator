const pool = require('../config/database');
const logger = require('../utils/logger');

class SalaryStructure {
  static async create(salaryData) {
    const {
      employee_id,
      basic_salary,
      house_rent_allowance = 0,
      transport_allowance = 0,
      medical_allowance = 0,
      other_allowances = 0,
      provident_fund_percentage = 0,
      tax_percentage = 0,
      effective_from
    } = salaryData;

    try {
      const result = await pool.query(
        `INSERT INTO salary_structure 
         (employee_id, basic_salary, house_rent_allowance, transport_allowance, 
          medical_allowance, other_allowances, provident_fund_percentage, 
          tax_percentage, effective_from)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          employee_id,
          basic_salary,
          house_rent_allowance,
          transport_allowance,
          medical_allowance,
          other_allowances,
          provident_fund_percentage,
          tax_percentage,
          effective_from
        ]
      );

      logger.info(`Salary structure created for employee: ${employee_id}`);
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating salary structure:', error);
      throw error;
    }
  }

  static async findByEmployeeId(employeeId) {
    try {
      const result = await pool.query(
        `SELECT * FROM salary_structure 
         WHERE employee_id = $1 AND (effective_to IS NULL OR effective_to >= CURRENT_DATE)
         ORDER BY effective_from DESC LIMIT 1`,
        [employeeId]
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error fetching salary structure:', error);
      throw error;
    }
  }

  static async update(id, salaryData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(salaryData).forEach(key => {
      if (salaryData[key] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(salaryData[key]);
        paramCount++;
      }
    });

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    try {
      const result = await pool.query(
        `UPDATE salary_structure SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
        values
      );

      logger.info(`Salary structure updated: ${id}`);
      return result.rows[0];
    } catch (error) {
      logger.error('Error updating salary structure:', error);
      throw error;
    }
  }
}

module.exports = SalaryStructure;
