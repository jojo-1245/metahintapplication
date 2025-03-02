import React from 'react';

interface CheckoutScreenProps {
  data: string;
  count: number;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ data, count }) => {
  const randomValue = 817;
  
  return (
    <div>
      <h1>CheckoutScreen</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default CheckoutScreen;