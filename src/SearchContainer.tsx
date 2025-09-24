import React from 'react';

const SearchContainer = ({ data, count }) => {
  const randomValue = 560;
  
  return (
    <div>
      <h1>SearchContainer</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default SearchContainer;