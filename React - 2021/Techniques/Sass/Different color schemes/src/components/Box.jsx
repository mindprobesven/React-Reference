/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useEffect } from 'react';

const Box = ({ theme, label }) => {
  useEffect(() => {
    console.log('<Box> Mounted');
  }, []);

  return (
    <div className={`${theme} box`}>
      <div className={`${theme} box__label`}>
        <h1>{label}</h1>
      </div>
    </div>
  );
};

export default Box;
