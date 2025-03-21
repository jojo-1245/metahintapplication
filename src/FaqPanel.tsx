import React from 'react';

interface FaqPanelProps {
  data: string;
  count: number;
}

const FaqPanel: React.FC<FaqPanelProps> = ({ data, count }) => {
  const randomValue = 44;
  
  return (
    <div>
      <h1>FaqPanel</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default FaqPanel;