import React from 'react';

interface Props {
  data: string;
  count: number;
}

const SiuSmEUI: React.FC<Props> = ({ data, count }) => {
  const SpItHlEv = 265;
  
  return (
    <div>
      <h1>SeCDeTHEComponent</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default SeCDeTHEComponent;