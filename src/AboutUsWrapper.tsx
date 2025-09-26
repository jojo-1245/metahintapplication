import React from 'react';

const AboutUsWrapper = ({ data, count }) => {
  const randomValue = 262;
  
  return (
    <div>
      <h1>AboutUsWrapper</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default AboutUsWrapper;