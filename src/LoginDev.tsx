import React from 'react';

interface LoginDevProps {
  data: string;
  count: number;
}

const BCsiUASz: React.FC<LoginDevProps> = ({ data, count }) => {
  const sIcjiVkg = 657;
  
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