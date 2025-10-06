const pool = require('../config/database');
const logger = require('../utils/logger');

class PayrollRecord {
  static async create(payrollData) {
    const {
      employee_id,
      salary_structure_id,
      month,
      year,
      working_days,
      days_present,
      basic_salary,
      house_rent_allowance = 0,
      transport_allowance = 0,
      medical_allowance = 0,
      other_allowances = 0,
      gross_salary,
      provident_fund = 0,
      tax_deduction = 0,
      other_deductions = 0,
      total_deductions,
      net_salary
    } = payrollData;

    try {
      const result = await pool.query(
        `INSERT INTO payroll_records 
         (employee_id, salary_structure_id, month, year, working_days, days_present,
          basic_salary, house_rent_allowance, transport_allowance, medical_allowance,
          other_allowances, gross_salary, provident_fund, tax_deduction, 
          other_deductions, total_deductions, net_salary)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
         RETURNING *`,
        [
          employee_id,
          salary_structure_id,
          month,
          year,
          working_days,
          days_present,
          basic_salary,
          house_rent_allowance,
          transport_allowance,
          medical_allowance,
          other_allowances,
          gross_salary,
          provident_fund,
          tax_deduction,
          other_deductions,
          total_deductions,
          net_salary
        ]
      );

      logger.info(`Payroll record created for employee: ${employee_id}, month: ${month}/${year}`);
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating payroll record:', error);
      throw error;
    }
  }

  static async findByEmployeeAndPeriod(employeeId, month, year) {
    try {
      const result = await pool.query(
        `SELECT pr.*, e.first_name, e.last_name, e.employee_code, e.designation, e.department
         FROM payroll_records pr
         JOIN employees e ON pr.employee_id = e.id
         WHERE pr.employee_id = $1 AND pr.month = $2 AND pr.year = $3`,
        [employeeId, month, year]
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error fetching payroll record:', error);
      throw error;
    }
  }

  static async findByPeriod(month, year) {
    try {
      const result = await pool.query(
        `SELECT pr.*, e.first_name, e.last_name, e.employee_code, e.designation, e.department
         FROM payroll_records pr
         JOIN employees e ON pr.employee_id = e.id
         WHERE pr.month = $1 AND pr.year = $2
         ORDER BY e.employee_code`,
        [month, year]
      );
      return result.rows;
    } catch (error) {
      logger.error('Error fetching payroll records:', error);
      throw error;
    }
  }

  static async updatePaymentStatus(id, status, paymentDate = null) {
    try {
      const result = await pool.query(
        `UPDATE payroll_records 
         SET payment_status = $1, payment_date = $2, updated_at = CURRENT_TIMESTAMP
         WHERE id = $3
         RETURNING *`,
        [status, paymentDate, id]
      );

      logger.info(`Payroll record payment status updated: ${id}`);
      return result.rows[0];
    } catch (error) {
      logger.error('Error updating payment status:', error);
      throw error;
    }
  }
}

module.exports = PayrollRecord;
