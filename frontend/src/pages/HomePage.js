import React from 'react';
import EmployeeList from '../components/EmployeeList';

const HomePage = () => {
  return (
    <div className="container">
      <div className="card">
        <h2>Welcome to Payroll Calculator & Payslip Generator</h2>
        <p style={{ color: '#555', marginBottom: '1.5rem' }}>
          A comprehensive system for managing employee payroll, calculating salaries, and generating payslips.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#ecf0f1', borderRadius: '8px' }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Employee Management</h3>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              Add, update, and manage employee information
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#ecf0f1', borderRadius: '8px' }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Salary Structure</h3>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              Configure salary components and deductions
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#ecf0f1', borderRadius: '8px' }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Payroll Calculation</h3>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              Calculate monthly payroll with attendance
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#ecf0f1', borderRadius: '8px' }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Payslip Generation</h3>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              Generate and view detailed payslips
            </p>
          </div>
        </div>
      </div>
      <EmployeeList />
    </div>
  );
};

export default HomePage;
