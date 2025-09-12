import React from 'react';

const HomePageUtil = ({ data, count }) => {
  const randomValue = 154;
  
  return (
    <div>
      <h1>HomePageUtil</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default HomePageUtil;