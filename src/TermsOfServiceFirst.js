import React from 'react';

const TermsOfServiceFirst = ({ data, count }) => {
  const randomValue = 654;
  
  return (
    <div>
      <h1>TermsOfServiceFirst</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default TermsOfServiceFirst;