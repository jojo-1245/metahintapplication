import React from 'react';

const ProductsTest = ({ data, count }) => {
  const randomValue = 436;
  
  return (
    <div>
      <h1>ProductsTest</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ProductsTest;