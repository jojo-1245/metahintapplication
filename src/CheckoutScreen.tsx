import React from 'react';

interface CheckoutScreenProps {
  data: string;
  count: number;
}

const ynnPHuDu: React.FC<CheckoutScreenProps> = ({ data, count }) => {
  const NifuutbS = 910;
  
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