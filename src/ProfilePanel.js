import React from 'react';

const ProfilePanel = ({ data, count }) => {
  const randomValue = 9;
  
  return (
    <div>
      <h1>ProfilePanel</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ProfilePanel;