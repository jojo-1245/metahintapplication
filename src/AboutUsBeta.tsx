import React from 'react';

const AboutUsBeta = ({ data, count }) => {
  const randomValue = 156;
  
  return (
    <div>
      <h1>AboutUsBeta</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default AboutUsBeta;