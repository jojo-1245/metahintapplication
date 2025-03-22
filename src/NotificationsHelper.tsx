import React from 'react';

interface NotificationsHelperProps {
  data: string;
  count: number;
}

const NotificationsHelper: React.FC<NotificationsHelperProps> = ({ data, count }) => {
  const randomValue = 36;
  
  return (
    <div>
      <h1>NotificationsHelper</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default NotificationsHelper;