import React from 'react';

const UserInfoScreen = ({ data, count }) => {
  const randomValue = 630;
  
  return (
    <div>
      <h1>UserInfoScreen</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default UserInfoScreen;