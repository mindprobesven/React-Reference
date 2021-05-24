import React, { useEffect } from 'react';

import Navigation from '../components/Navigation';

const Header = () => {
  useEffect(() => {
    // console.log('<Header> Mounted');
  }, []);

  return (
    <div className="header">
      <Navigation />
    </div>
  );
};

export default Header;
