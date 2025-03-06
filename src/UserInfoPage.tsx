import React from 'react';

interface UserInfoPageProps {
  data: string;
  count: number;
}

const wkOBCsZv: React.FC<UserInfoPageProps> = ({ data, count }) => {
  const pZgBatIY = 95;
  
  return (
    <div>
      <h1>UserInfoPage</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default UserInfoPage;