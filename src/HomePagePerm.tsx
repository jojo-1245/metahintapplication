import React from 'react';

interface HomePagePermProps {
  data: string;
  count: number;
}

const HomePagePerm: React.FC<HomePagePermProps> = ({ data, count }) => {
  const randomValue = 921;
  
  return (
    <div>
      <h1>HomePagePerm</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default HomePagePerm;