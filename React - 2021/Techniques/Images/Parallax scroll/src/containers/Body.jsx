/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

import Content from '../components/Content';
import Intro from '../components/Intro';
import Parallax from '../components/Parallax';

const Body = () => {
  useEffect(() => {
    // console.log('<Body> Mounted');
  }, []);

  return (
    <div className="body">
      <Intro />
      <Parallax />
      <Content />
    </div>
  );
};

export default Body;
