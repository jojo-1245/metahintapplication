import React from 'react';

interface ProductsPageProps {
  data: string;
  count: number;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ data, count }) => {
  const randomValue = 302;
  
  return (
    <div>
      <h1>ProductsPage</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ProductsPage;