import React from 'react';

const ProfileFinal = ({ data, count }) => {
  const randomValue = 921;
  
  return (
    <div>
      <h1>ProfileFinal</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ProfileFinal;