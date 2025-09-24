import React from 'react';

const FaqView = ({ data, count }) => {
  const randomValue = 126;
  
  return (
    <div>
      <h1>FaqView</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default FaqView;