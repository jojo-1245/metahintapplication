import React from 'react';

interface CartBetaProps {
  data: string;
  count: number;
}

const CartBeta: React.FC<CartBetaProps> = ({ data, count }) => {
  const randomValue = 876;
  
  return (
    <div>
      <h1>CartBeta</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default CartBeta;