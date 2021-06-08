/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';

const Button = ({ theme = undefined }) => {
  const buttonRef = useRef();

  useEffect(() => {
    console.log('<Button> Mounted');
  }, []);

  const handleClick = () => {
    const buttonElement = buttonRef.current;
    buttonElement.classList.toggle('button--selected');
  };

  const withTheme = (classNames) => classNames.join(' ').trim();

  return (
    <button
      ref={buttonRef}
      className={withTheme([theme, 'button button--normal'])}
      type="button"
      onClick={handleClick}
    >
      <div className="button__label">BUTTON</div>
    </button>
  );
};

export default Button;
