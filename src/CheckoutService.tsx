import React from 'react';

const CheckoutService = ({ data, count }) => {
  const randomValue = 285;
  
  return (
    <div>
      <h1>CheckoutService</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default CheckoutService;