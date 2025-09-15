import React from 'react';

const ProductsWrapper = ({ data, count }) => {
  const randomValue = 385;
  
  return (
    <div>
      <h1>ProductsWrapper</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ProductsWrapper;