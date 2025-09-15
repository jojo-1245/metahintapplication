import React from 'react';

const ProfileHelper = ({ data, count }) => {
  const randomValue = 888;
  
  return (
    <div>
      <h1>ProfileHelper</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ProfileHelper;