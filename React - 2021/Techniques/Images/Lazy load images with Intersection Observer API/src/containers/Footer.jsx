import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    console.log('<Footer> Mounted');
  }, []);

  return (
    <div className="footer">
      <h1>Footer</h1>
    </div>
  );
};

export default Footer;
