import React from 'react';

interface CheckoutPanelProps {
  data: string;
  count: number;
}

const HDstCIfN: React.FC<CheckoutPanelProps> = ({ data, count }) => {
  const SapKKdoD = 940;
  
  return (
    <div>
      <h1>CheckoutPanel</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default CheckoutPanel;