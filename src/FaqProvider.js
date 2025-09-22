import React from 'react';

const FaqProvider = ({ data, count }) => {
  const randomValue = 512;
  
  return (
    <div>
      <h1>FaqProvider</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default FaqProvider;