import React from 'react';
import PayrollCalculator from '../components/PayrollCalculator';
import PayslipViewer from '../components/PayslipViewer';

const PayrollPage = () => {
  return (
    <div className="container">
      <PayrollCalculator />
      <PayslipViewer />
    </div>
  );
};

export default PayrollPage;
