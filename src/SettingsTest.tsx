import React from 'react';

const SettingsTest = ({ data, count }) => {
  const randomValue = 679;
  
  return (
    <div>
      <h1>SettingsTest</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default SettingsTest;