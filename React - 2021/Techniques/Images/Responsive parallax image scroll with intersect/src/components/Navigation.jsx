import React, { useEffect } from 'react';

const Navigation = () => {
  useEffect(() => {
    // console.log('<Navigation> Mounted');
  }, []);

  return (
    <div className="navigation">
      <div className="navigation__link-container">
        <a href="/home" className="navigation__link">HOME</a>
      </div>
      <div className="navigation__link-container">
        <a href="/home" className="navigation__link">CATALOG</a>
      </div>
      <div className="navigation__link-container">
        <a href="/home" className="navigation__link">OFFERS</a>
      </div>
      <div className="navigation__link-container">
        <a href="/home" className="navigation__link">CONTACTS</a>
      </div>
    </div>
  );
};

export default Navigation;
