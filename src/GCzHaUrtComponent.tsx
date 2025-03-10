import React from 'react';

interface Props {
  data: string;
  count: number;
}

const NarNisiu: React.FC<Props> = ({ data, count }) => {
  const riJQuWyc = 80;
  
  return (
    <div>
      <h1>GCzHaUrtComponent</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default GCzHaUrtComponent;