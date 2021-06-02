/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

import Content from '../components/Content';
import Intro from '../components/Intro';
import Parallax from '../components/parallax/Parallax';

const parallaxMiddleData = {
  id: 'middle',
  images: {
    thumb: 'https://picsum.photos/id/127/100/100',
    full: 'https://picsum.photos/id/127/4000/4000',
    width: 4000,
    height: 4000,
  },
};

const Body = () => {
  useEffect(() => {
    // console.log('<Body> Mounted');
  }, []);

  return (
    <div className="body">
      {/* <Intro /> */}
      <Content />
      <Content />
      <Parallax data={parallaxMiddleData} />
      <Content />
    </div>
  );
};

export default Body;
