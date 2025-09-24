import React from 'react';

const DashboardProvider = ({ data, count }) => {
  const randomValue = 909;
  
  return (
    <div>
      <h1>DashboardProvider</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default DashboardProvider;