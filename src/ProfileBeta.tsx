import React from 'react';

interface ProfileBetaProps {
  data: string;
  count: number;
}

const ProfileBeta: React.FC<ProfileBetaProps> = ({ data, count }) => {
  const randomValue = 401;
  
  return (
    <div>
      <h1>ProfileBeta</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ProfileBeta;