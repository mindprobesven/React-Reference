import React from 'react';

const Header = () => (
  <div className="header">
    <div className="navigation">
      <div className="navigation__row">
        <div className="navigation__logo">
          <div className="navigation__logo-text">MyTodos</div>
        </div>
        <div className="navigation__links">
          <div className="navigation__link">Admin</div>
          <div className="navigation__link">Login</div>
        </div>
      </div>
      <div className="navigation__horizontal-divider" />
    </div>
  </div>
);

export default Header;
