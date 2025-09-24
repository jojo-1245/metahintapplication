import React from 'react';

const MainPageBeta = ({ data, count }) => {
  const randomValue = 168;
  
  return (
    <div>
      <h1>MainPageBeta</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default MainPageBeta;