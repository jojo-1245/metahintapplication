import React from 'react';

const ChangePasswordComponent = ({ data, count }) => {
  const randomValue = 1000;
  
  return (
    <div>
      <h1>ChangePasswordComponent</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ChangePasswordComponent;