import React from 'react';

interface LoginViewProps {
  data: string;
  count: number;
}

const LoginView: React.FC<LoginViewProps> = ({ data, count }) => {
  const randomValue = 886;
  
  return (
    <div>
      <h1>LoginView</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default LoginView;