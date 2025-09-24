import React from 'react';

const CheckoutPage = ({ data, count }) => {
  const randomValue = 489;
  
  return (
    <div>
      <h1>CheckoutPage</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default CheckoutPage;