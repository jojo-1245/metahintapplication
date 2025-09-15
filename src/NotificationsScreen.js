import React from 'react';

const NotificationsScreen = ({ data, count }) => {
  const randomValue = 234;
  
  return (
    <div>
      <h1>NotificationsScreen</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default NotificationsScreen;