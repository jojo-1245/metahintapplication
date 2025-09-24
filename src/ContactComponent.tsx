import React from 'react';

const ContactComponent = ({ data, count }) => {
  const randomValue = 903;
  
  return (
    <div>
      <h1>ContactComponent</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ContactComponent;