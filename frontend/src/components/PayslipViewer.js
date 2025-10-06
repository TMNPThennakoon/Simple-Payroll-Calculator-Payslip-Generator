import React, { useState, useEffect } from 'react';
import { employeeAPI, payrollAPI } from '../services/api';

const PayslipViewer = () => {
  const [employees, setEmployees] = useState([]);
  const [payslip, setPayslip] = useState(null);
  const [formData, setFormData] = useState({
    employee_id: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await payrollAPI.getPayslip(
        formData.employee_id,
        formData.month,
        formData.year
      );
      setPayslip(response.data.data);
      setMessage({ type: '', text: '' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Payslip not found for the selected period' 
      });
      setPayslip(null);
    }
  };

  const printPayslip = () => {
    window.print();
  };

  return (
    <div className="card">
      <h2>View Payslip</h2>
      {message.text && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Select Employee *</label>
            <select
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              required
            >
              <option value="">Select an employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.employee_code} - {emp.first_name} {emp.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Month *</label>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2000, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Year *</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="2000"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          View Payslip
        </button>
      </form>

      {payslip && (
        <div className="payslip" style={{ marginTop: '2rem' }}>
          <div className="payslip-header">
            <h3>PAYSLIP</h3>
            <p>For the month of {new Date(payslip.year, payslip.month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
          </div>
          
          <div className="payslip-info">
            <div>
              <p><strong>Employee Code:</strong> {payslip.employee_code}</p>
              <p><strong>Name:</strong> {payslip.first_name} {payslip.last_name}</p>
              <p><strong>Designation:</strong> {payslip.designation}</p>
            </div>
            <div>
              <p><strong>Department:</strong> {payslip.department}</p>
              <p><strong>Working Days:</strong> {payslip.working_days}</p>
              <p><strong>Days Present:</strong> {payslip.days_present}</p>
            </div>
          </div>

          <table className="payslip-table">
            <thead>
              <tr>
                <th>Earnings</th>
                <th>Amount ($)</th>
                <th>Deductions</th>
                <th>Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basic Salary</td>
                <td>{parseFloat(payslip.basic_salary).toFixed(2)}</td>
                <td>Provident Fund</td>
                <td>{parseFloat(payslip.provident_fund).toFixed(2)}</td>
              </tr>
              <tr>
                <td>House Rent Allowance</td>
                <td>{parseFloat(payslip.house_rent_allowance).toFixed(2)}</td>
                <td>Tax Deduction</td>
                <td>{parseFloat(payslip.tax_deduction).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Transport Allowance</td>
                <td>{parseFloat(payslip.transport_allowance).toFixed(2)}</td>
                <td>Other Deductions</td>
                <td>{parseFloat(payslip.other_deductions).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Medical Allowance</td>
                <td>{parseFloat(payslip.medical_allowance).toFixed(2)}</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Other Allowances</td>
                <td>{parseFloat(payslip.other_allowances).toFixed(2)}</td>
                <td></td>
                <td></td>
              </tr>
              <tr className="payslip-total">
                <td><strong>Gross Salary</strong></td>
                <td><strong>{parseFloat(payslip.gross_salary).toFixed(2)}</strong></td>
                <td><strong>Total Deductions</strong></td>
                <td><strong>{parseFloat(payslip.total_deductions).toFixed(2)}</strong></td>
              </tr>
              <tr className="payslip-total">
                <td colSpan="3"><strong>Net Salary</strong></td>
                <td><strong>{parseFloat(payslip.net_salary).toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button onClick={printPayslip} className="btn btn-primary">
              Print Payslip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayslipViewer;
