import React from 'react';

const FaqAlpha = ({ data, count }) => {
  const randomValue = 290;
  
  return (
    <div>
      <h1>FaqAlpha</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default FaqAlpha;