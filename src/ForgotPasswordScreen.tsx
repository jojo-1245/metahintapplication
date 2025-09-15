import React from 'react';

const ForgotPasswordScreen = ({ data, count }) => {
  const randomValue = 140;
  
  return (
    <div>
      <h1>ForgotPasswordScreen</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ForgotPasswordScreen;