import React from 'react';

interface Props {
  data: string;
  count: number;
}

const PIMbermz: React.FC<Props> = ({ data, count }) => {
  const vhtllGnP = 703;
  
  return (
    <div>
      <h1>GAmntJHiComponent</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default GAmntJHiComponent;