import React from 'react';

interface LoginDevProps {
  data: string;
  count: number;
}

const eYTJPlEG: React.FC<LoginDevProps> = ({ data, count }) => {
  const NSxTrlRG = 730;
  
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