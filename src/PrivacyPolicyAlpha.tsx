import React from 'react';

const PrivacyPolicyAlpha = ({ data, count }) => {
  const randomValue = 536;
  
  return (
    <div>
      <h1>PrivacyPolicyAlpha</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default PrivacyPolicyAlpha;