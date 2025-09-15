import React from 'react';

const OrderHistoryDev = ({ data, count }) => {
  const randomValue = 49;
  
  return (
    <div>
      <h1>OrderHistoryDev</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default OrderHistoryDev;