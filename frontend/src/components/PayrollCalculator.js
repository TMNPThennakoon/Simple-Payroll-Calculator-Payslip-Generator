import React, { useState, useEffect } from 'react';
import { employeeAPI, payrollAPI } from '../services/api';

const PayrollCalculator = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    working_days: 30,
    days_present: 30
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [calculating, setCalculating] = useState(false);

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
    setCalculating(true);
    try {
      const response = await payrollAPI.calculate(formData);
      setMessage({ 
        type: 'success', 
        text: `Payroll calculated successfully! Net Salary: $${response.data.data.net_salary}` 
      });
      setFormData({
        ...formData,
        employee_id: '',
        days_present: formData.working_days
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to calculate payroll' 
      });
    } finally {
      setCalculating(false);
    }
  };

  return (
    <div className="card">
      <h2>Calculate Payroll</h2>
      {message.text && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
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
        <div className="form-row">
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
        <div className="form-row">
          <div className="form-group">
            <label>Working Days *</label>
            <input
              type="number"
              name="working_days"
              value={formData.working_days}
              onChange={handleChange}
              min="1"
              max="31"
              required
            />
          </div>
          <div className="form-group">
            <label>Days Present *</label>
            <input
              type="number"
              name="days_present"
              value={formData.days_present}
              onChange={handleChange}
              min="0"
              max={formData.working_days}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success" disabled={calculating}>
          {calculating ? 'Calculating...' : 'Calculate Payroll'}
        </button>
      </form>
    </div>
  );
};

export default PayrollCalculator;
