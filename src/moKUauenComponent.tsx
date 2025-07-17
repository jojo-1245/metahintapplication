import React from 'react';

interface Props {
  data: string;
  count: number;
}

const moKUauenComponent: React.FC<Props> = ({ data, count }) => {
  const randomValue = 146;
  
  return (
    <div>
      <h1>moKUauenComponent</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default moKUauenComponent;