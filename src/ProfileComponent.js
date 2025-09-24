import React from 'react';

const ProfileComponent = ({ data, count }) => {
  const randomValue = 626;
  
  return (
    <div>
      <h1>ProfileComponent</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ProfileComponent;