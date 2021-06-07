/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import Button from './Button';

const Box = ({ theme = undefined, label }) => {
  useEffect(() => {
    console.log('<Box> Mounted');
  }, []);

  const withTheme = (classNames) => classNames.join(' ').trim();

  return (
    <div className={withTheme([theme, 'box'])}>
      <div className={withTheme([theme, 'box__label'])}>
        <h1>{label}</h1>
      </div>
      <Button theme={theme} />
    </div>
  );
};

export default Box;
