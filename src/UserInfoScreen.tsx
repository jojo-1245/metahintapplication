import React from 'react';

interface UserInfoScreenProps {
  data: string;
  count: number;
}

const JssbatYz: React.FC<UserInfoScreenProps> = ({ data, count }) => {
  const VEbsBvFR = 808;
  
  return (
    <div>
      <h1>UserInfoScreen</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default UserInfoScreen;