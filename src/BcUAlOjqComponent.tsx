import React from 'react';

interface Props {
  data: string;
  count: number;
}

const tCmfcCOP: React.FC<Props> = ({ data, count }) => {
  const adLvOfDf = 262;
  
  return (
    <div>
      <h1>BcUAlOjqComponent</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default BcUAlOjqComponent;