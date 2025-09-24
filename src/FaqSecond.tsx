import React from 'react';

const FaqSecond = ({ data, count }) => {
  const randomValue = 133;
  
  return (
    <div>
      <h1>FaqSecond</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default FaqSecond;