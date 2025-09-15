import React from 'react';

const NotificationsDev = ({ data, count }) => {
  const randomValue = 693;
  
  return (
    <div>
      <h1>NotificationsDev</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default NotificationsDev;