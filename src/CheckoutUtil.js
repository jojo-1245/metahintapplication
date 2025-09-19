import React from 'react';

const CheckoutUtil = ({ data, count }) => {
  const randomValue = 562;
  
  return (
    <div>
      <h1>CheckoutUtil</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default CheckoutUtil;