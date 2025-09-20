import React from 'react';

const ChangePasswordWrapper = ({ data, count }) => {
  const randomValue = 585;
  
  return (
    <div>
      <h1>ChangePasswordWrapper</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ChangePasswordWrapper;