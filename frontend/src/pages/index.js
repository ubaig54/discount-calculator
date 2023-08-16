import React, { useState, useEffect } from 'react';

import Calculator from './Calculator';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Calculator />
  );
};

export default Home;
