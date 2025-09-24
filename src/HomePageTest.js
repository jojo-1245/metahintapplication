import React from 'react';

const HomePageTest = ({ data, count }) => {
  const randomValue = 138;
  
  return (
    <div>
      <h1>HomePageTest</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default HomePageTest;