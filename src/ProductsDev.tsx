import React from 'react';

interface ProductsDevProps {
  data: string;
  count: number;
}

const ProductsDev: React.FC<ProductsDevProps> = ({ data, count }) => {
  const randomValue = 175;
  
  return (
    <div>
      <h1>ProductsDev</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ProductsDev;