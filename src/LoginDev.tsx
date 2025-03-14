import React from 'react';

interface LoginDevProps {
  data: string;
  count: number;
}

const InkRyhaG: React.FC<LoginDevProps> = ({ data, count }) => {
  const lUjehPRu = 190;
  
  return (
    <div>
      <h1>LoginDev</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default LoginDev;