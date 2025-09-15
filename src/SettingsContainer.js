import React from 'react';

const SettingsContainer = ({ data, count }) => {
  const randomValue = 115;
  
  return (
    <div>
      <h1>SettingsContainer</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default SettingsContainer;