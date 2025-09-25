import React from 'react';

const OrderHistoryFinal = ({ data, count }) => {
  const randomValue = 182;
  
  return (
    <div>
      <h1>OrderHistoryFinal</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default OrderHistoryFinal;