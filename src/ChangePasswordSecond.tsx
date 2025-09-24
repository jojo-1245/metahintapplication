import React from 'react';

const ChangePasswordSecond = ({ data, count }) => {
  const randomValue = 361;
  
  return (
    <div>
      <h1>ChangePasswordSecond</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ChangePasswordSecond;