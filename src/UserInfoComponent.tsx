import React from 'react';

const UserInfoComponent = ({ data, count }) => {
  const randomValue = 3;
  
  return (
    <div>
      <h1>UserInfoComponent</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default UserInfoComponent;