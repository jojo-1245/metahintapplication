import React from 'react';

const SettingsPerm = ({ data, count }) => {
  const randomValue = 781;
  
  return (
    <div>
      <h1>SettingsPerm</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default SettingsPerm;