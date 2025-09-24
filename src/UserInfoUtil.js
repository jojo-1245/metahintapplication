import React from 'react';

const UserInfoUtil = ({ data, count }) => {
  const randomValue = 646;
  
  return (
    <div>
      <h1>UserInfoUtil</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default UserInfoUtil;