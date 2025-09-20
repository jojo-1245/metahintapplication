import React from 'react';

const DashboardPanel = ({ data, count }) => {
  const randomValue = 537;
  
  return (
    <div>
      <h1>DashboardPanel</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default DashboardPanel;