import React from 'react';

const LoginPage = ({ data, count }) => {
  const randomValue = 87;
  
  return (
    <div>
      <h1>LoginPage</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default LoginPage;