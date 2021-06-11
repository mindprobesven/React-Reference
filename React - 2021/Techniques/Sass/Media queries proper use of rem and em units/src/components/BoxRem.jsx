/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

const BoxRem = () => {
  useEffect(() => {
    console.log('<BoxRem> Mounted');
  }, []);

  return (
    <div className="box-rem">
      <div className="box-rem__text">ROOT LEVEL</div>
      <div className="box-rem__text-one-em">ROOT LEVEL 1em</div>
      <div className="box-rem__text-one-rem">ROOT LEVEL 1rem</div>
    </div>
  );
};

export default BoxRem;
