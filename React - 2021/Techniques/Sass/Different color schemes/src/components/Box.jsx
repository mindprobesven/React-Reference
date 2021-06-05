/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useEffect } from 'react';

const Box = ({ theme, label }) => {
  useEffect(() => {
    console.log('<Box> Mounted');
  }, []);

  const withTheme = (classNames) => classNames.join(' ').trim();

  return (
    <div className={withTheme([theme, 'box'])}>
      <div className={withTheme([theme, 'box__label'])}>
        <h1>{label}</h1>
      </div>
    </div>
  );
};

export default Box;
