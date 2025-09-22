import React from 'react';

const SearchComponent = ({ data, count }) => {
  const randomValue = 240;
  
  return (
    <div>
      <h1>SearchComponent</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default SearchComponent;