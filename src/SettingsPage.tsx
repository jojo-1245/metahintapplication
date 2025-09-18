import React from 'react';

const SettingsPage = ({ data, count }) => {
  const randomValue = 790;
  
  return (
    <div>
      <h1>SettingsPage</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default SettingsPage;