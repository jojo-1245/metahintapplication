import React from 'react';

interface AboutUsUtilProps {
  data: string;
  count: number;
}

const AboutUsUtil: React.FC<AboutUsUtilProps> = ({ data, count }) => {
  const randomValue = 494;
  
  return (
    <div>
      <h1>AboutUsUtil</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default AboutUsUtil;