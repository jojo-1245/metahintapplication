import React from 'react';

const DashboardPerm = ({ data, count }) => {
  const randomValue = 106;
  
  return (
    <div>
      <h1>DashboardPerm</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default DashboardPerm;