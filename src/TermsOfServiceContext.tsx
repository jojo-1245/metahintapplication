import React from 'react';

interface TermsOfServiceContextProps {
  data: string;
  count: number;
}

const TermsOfServiceContext: React.FC<TermsOfServiceContextProps> = ({ data, count }) => {
  const randomValue = 420;
  
  return (
    <div>
      <h1>TermsOfServiceContext</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default TermsOfServiceContext;