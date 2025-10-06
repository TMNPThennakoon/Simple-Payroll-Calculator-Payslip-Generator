import React, { useState, useEffect } from 'react';
import { employeeAPI, salaryAPI } from '../services/api';

const SalaryForm = ({ onSuccess }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    basic_salary: '',
    house_rent_allowance: '',
    transport_allowance: '',
    medical_allowance: '',
    other_allowances: '',
    provident_fund_percentage: '',
    tax_percentage: '',
    effective_from: ''
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
      await salaryAPI.create(formData);
      setMessage({ type: 'success', text: 'Salary structure created successfully!' });
      setFormData({
        employee_id: '',
        basic_salary: '',
        house_rent_allowance: '',
        transport_allowance: '',
        medical_allowance: '',
        other_allowances: '',
        provident_fund_percentage: '',
        tax_percentage: '',
        effective_from: ''
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to create salary structure' 
      });
    }
  };

  return (
    <div className="card">
      <h2>Create Salary Structure</h2>
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
            <label>Basic Salary *</label>
            <input
              type="number"
              step="0.01"
              name="basic_salary"
              value={formData.basic_salary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>House Rent Allowance</label>
            <input
              type="number"
              step="0.01"
              name="house_rent_allowance"
              value={formData.house_rent_allowance}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Transport Allowance</label>
            <input
              type="number"
              step="0.01"
              name="transport_allowance"
              value={formData.transport_allowance}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Medical Allowance</label>
            <input
              type="number"
              step="0.01"
              name="medical_allowance"
              value={formData.medical_allowance}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Other Allowances</label>
            <input
              type="number"
              step="0.01"
              name="other_allowances"
              value={formData.other_allowances}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Provident Fund (%)</label>
            <input
              type="number"
              step="0.01"
              name="provident_fund_percentage"
              value={formData.provident_fund_percentage}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Tax Percentage (%)</label>
            <input
              type="number"
              step="0.01"
              name="tax_percentage"
              value={formData.tax_percentage}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Effective From *</label>
            <input
              type="date"
              name="effective_from"
              value={formData.effective_from}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Salary Structure
        </button>
      </form>
    </div>
  );
};

export default SalaryForm;
