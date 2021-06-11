/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

const BoxEm = () => {
  useEffect(() => {
    console.log('<BoxEm> Mounted');
  }, []);

  return (
    <div className="box-em">
      <div className="box-em__text">ELEMENT LEVEL</div>
      <div className="box-em__text-one-em">ELEMENT LEVEL 1em</div>
      <div className="box-em__text-one-rem">ELEMENT LEVEL 1rem</div>
    </div>
  );
};

export default BoxEm;
