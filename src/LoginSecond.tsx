import React from 'react';

const LoginSecond = ({ data, count }) => {
  const randomValue = 487;
  
  return (
    <div>
      <h1>LoginSecond</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default LoginSecond;