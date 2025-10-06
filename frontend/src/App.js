import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/App.css';
import HomePage from './pages/HomePage';
import EmployeePage from './pages/EmployeePage';
import SalaryPage from './pages/SalaryPage';
import PayrollPage from './pages/PayrollPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>Payroll Calculator & Payslip Generator</h1>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/employees">Employees</Link></li>
            <li><Link to="/salary">Salary Structure</Link></li>
            <li><Link to="/payroll">Payroll & Payslips</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/salary" element={<SalaryPage />} />
          <Route path="/payroll" element={<PayrollPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
