/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

import Content from '../components/Content';
import Intro from '../components/Intro';
import Parallax from '../components/parallax/Parallax';

const Body = () => {
  useEffect(() => {
    // console.log('<Body> Mounted');
  }, []);

  return (
    <div className="body">
      {/* <Intro /> */}
      <Content />
      <Content />
      <Parallax />
      <Content />
    </div>
  );
};

export default Body;
