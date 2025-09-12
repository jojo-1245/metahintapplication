import React from 'react';

const SettingsDev = ({ data, count }) => {
  const randomValue = 486;
  
  return (
    <div>
      <h1>SettingsDev</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default SettingsDev;