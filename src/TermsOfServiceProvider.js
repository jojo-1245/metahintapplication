import React from 'react';

const TermsOfServiceProvider = ({ data, count }) => {
  const randomValue = 190;
  
  return (
    <div>
      <h1>TermsOfServiceProvider</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default TermsOfServiceProvider;