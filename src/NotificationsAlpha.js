import React from 'react';

const NotificationsAlpha = ({ data, count }) => {
  const randomValue = 325;
  
  return (
    <div>
      <h1>NotificationsAlpha</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default NotificationsAlpha;