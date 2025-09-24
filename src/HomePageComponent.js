import React from 'react';

const HomePageComponent = ({ data, count }) => {
  const randomValue = 762;
  
  return (
    <div>
      <h1>HomePageComponent</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default HomePageComponent;