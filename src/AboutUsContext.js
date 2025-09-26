import React from 'react';

const AboutUsContext = ({ data, count }) => {
  const randomValue = 665;
  
  return (
    <div>
      <h1>AboutUsContext</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default AboutUsContext;