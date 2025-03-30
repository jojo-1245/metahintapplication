import React from 'react';

interface CartPermProps {
  data: string;
  count: number;
}

const RMvohUzV: React.FC<CartPermProps> = ({ data, count }) => {
  const ntzpnaUg = 33;
  
  return (
    <div>
      <h1>CartPerm</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default CartPerm;