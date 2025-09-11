import React from 'react';

const CheckoutProvider = ({ data, count }) => {
  const randomValue = 340;
  
  return (
    <div>
      <h1>CheckoutProvider</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default CheckoutProvider;