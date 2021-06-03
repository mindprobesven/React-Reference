/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

import Content from '../components/Content';
import Intro from '../components/Intro';
import Parallax from '../components/parallax/Parallax';

const parallaxTopData = {
  id: 'top',
  images: {
    thumb: 'https://picsum.photos/id/785/100/100',
    full: 'https://picsum.photos/id/785/1920/1920',
    width: 1920,
    height: 1920,
  },
  content: {
    headline: 'PARALLAX TOP',
    scrollSpeed: 2.0,
  },
  options: {
    landscape: {
      small: {
        heightImageRatio: 0.5,
        imageScrollSpeed: 0.5,
        imageOffset: 0,
      },
      medium: {
        heightImageRatio: 0.5,
        imageScrollSpeed: 0.5,
        imageOffset: 0,
      },
      large: {
        heightImageRatio: 0.25,
        imageScrollSpeed: 0.75,
        imageOffset: 0,
      },
    },
    portrait: {
      heightImageRatio: 0.75,
      imageScrollSpeed: 0.75,
      imageOffset: 0,
    },
    intersectAbove: 250,
    viewportStartScrollPos: 1.0,
  },
};

const parallaxMiddleData = {
  id: 'middle',
  images: {
    thumb: 'https://picsum.photos/id/127/100/100',
    full: 'https://picsum.photos/id/127/1920/1920',
    width: 1920,
    height: 1920,
  },
  content: {
    headline: 'PARALLAX MIDDLE',
    scrollSpeed: 2.0,
  },
  options: {
    landscape: {
      small: {
        heightImageRatio: 0.5,
        imageScrollSpeed: 0.5,
        imageOffset: 0,
      },
      medium: {
        heightImageRatio: 0.5,
        imageScrollSpeed: 0.75,
        imageOffset: 0,
      },
      large: {
        heightImageRatio: 0.5,
        imageScrollSpeed: 0.75,
        imageOffset: 0,
      },
    },
    portrait: {
      heightImageRatio: 0.75,
      imageScrollSpeed: 0.75,
      imageOffset: 0,
    },
    intersectAbove: 250,
    viewportStartScrollPos: 1.0,
  },
};

const parallaxBottomData = {
  id: 'bottom',
  images: {
    thumb: 'https://picsum.photos/id/883/100/100',
    full: 'https://picsum.photos/id/883/1920/1920',
    width: 1920,
    height: 1920,
  },
  content: {
    headline: 'PARALLAX BOTTOM',
    scrollSpeed: 2.0,
  },
  options: {
    landscape: {
      small: {
        heightImageRatio: 0.5,
        imageScrollSpeed: 0.5,
        imageOffset: 0,
      },
      medium: {
        heightImageRatio: 0.5,
        imageScrollSpeed: 0.75,
        imageOffset: 0,
      },
      large: {
        heightImageRatio: 0.5,
        imageScrollSpeed: 0.75,
        imageOffset: 0,
      },
    },
    portrait: {
      heightImageRatio: 0.75,
      imageScrollSpeed: 0.75,
      imageOffset: 0,
    },
    intersectAbove: 250,
    viewportStartScrollPos: 1.0,
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
      <Parallax data={parallaxTopData} />
      <Content />
      <Content />
      <Parallax data={parallaxMiddleData} />
      <Content />
      <Content />
      <Parallax data={parallaxBottomData} />
    </div>
  );
};

export default Body;
