import React from 'react';

const DashboardWrapper = ({ data, count }) => {
  const randomValue = 165;
  
  return (
    <div>
      <h1>DashboardWrapper</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default DashboardWrapper;