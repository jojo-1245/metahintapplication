import React from 'react';

const ContactPage = ({ data, count }) => {
  const randomValue = 825;
  
  return (
    <div>
      <h1>ContactPage</h1>
      <p>Data: {data}</p>
      <p>Count: {count}</p>
      <p>Random Value: {randomValue}</p>
    </div>
  );
};

export default ContactPage;