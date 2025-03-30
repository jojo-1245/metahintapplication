import React from 'react';

interface ProfileAlphaProps {
  data: string;
  count: number;
}

const ProfileAlpha: React.FC<ProfileAlphaProps> = ({ data, count }) => {
  const randomValue = 67;
  
  return (
    <div>
      <h1>ProfileAlpha</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ProfileAlpha;