import React from 'react';

const HomePagePanel = ({ data, count }) => {
  const randomValue = 348;
  
  return (
    <div>
      <h1>HomePagePanel</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default HomePagePanel;