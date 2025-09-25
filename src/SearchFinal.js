import React from 'react';

const SearchFinal = ({ data, count }) => {
  const randomValue = 836;
  
  return (
    <div>
      <h1>SearchFinal</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default SearchFinal;