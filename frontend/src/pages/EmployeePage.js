import React, { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';

const EmployeePage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEmployeeCreated = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  return (
    <div className="container">
      <EmployeeForm onSuccess={handleEmployeeCreated} />
      <EmployeeList key={refreshKey} />
    </div>
  );
};

export default EmployeePage;
