import React from 'react';

const ProfileScreen = ({ data, count }) => {
  const randomValue = 673;
  
  return (
    <div>
      <h1>ProfileScreen</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ProfileScreen;