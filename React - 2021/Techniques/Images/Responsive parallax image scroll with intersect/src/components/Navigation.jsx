import React, { useEffect } from 'react';

const Navigation = () => {
  useEffect(() => {
    // console.log('<Navigation> Mounted');
  }, []);

  return (
    <div className="navigation">
      <div className="navigation__link-container">
        <a href="/home" className="navigation__link-text">Home</a>
      </div>
      <div className="navigation__link-container">
        <a href="/home" className="navigation__link-text">Household</a>
      </div>
      <div className="navigation__link-container">
        <a href="/home" className="navigation__link-text">Electronics</a>
      </div>
      <div className="navigation__link-container">
        <a href="/home" className="navigation__link-text">Kids</a>
      </div>
    </div>
  );
};

export default Navigation;
