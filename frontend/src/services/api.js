import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Employee APIs
export const employeeAPI = {
  getAll: (status = 'active') => api.get(`/employees?status=${status}`),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`)
};

// Salary APIs
export const salaryAPI = {
  create: (data) => api.post('/salary', data),
  getByEmployee: (employeeId) => api.get(`/salary/employee/${employeeId}`),
  update: (id, data) => api.put(`/salary/${id}`, data)
};

// Payroll APIs
export const payrollAPI = {
  calculate: (data) => api.post('/payroll/calculate', data),
  getPayslip: (employeeId, month, year) => api.get(`/payroll/${employeeId}/${month}/${year}`),
  getByPeriod: (month, year) => api.get(`/payroll/period/${month}/${year}`),
  updatePaymentStatus: (id, data) => api.put(`/payroll/${id}/payment-status`, data)
};

export default api;
