const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payroll Calculator & Payslip Generator API',
      version: '1.0.0',
      description: 'API documentation for Simple Payroll Calculator & Payslip Generator system',
      contact: {
        name: 'API Support',
        email: 'support@payroll.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Employees',
        description: 'Employee management endpoints'
      },
      {
        name: 'Salary',
        description: 'Salary structure management endpoints'
      },
      {
        name: 'Payroll',
        description: 'Payroll calculation and payslip generation endpoints'
      }
    ]
  },
  apis: ['./src/controllers/*.js', './src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
