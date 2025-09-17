import React from 'react';

const ContactScreen = ({ data, count }) => {
  const randomValue = 819;
  
  return (
    <div>
      <h1>ContactScreen</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ContactScreen;