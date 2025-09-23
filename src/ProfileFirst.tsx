import React from 'react';

const ProfileFirst = ({ data, count }) => {
  const randomValue = 559;
  
  return (
    <div>
      <h1>ProfileFirst</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ProfileFirst;