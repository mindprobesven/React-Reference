import React from 'react';

import Content from '../components/Content';
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
    // The content should already be in its final position when a parallax is used as a top hero gfx.
    // This is achieved by setting the scrollSpeed multiplier to a high value (e.g. 10).
    scrollSpeed: 10.0,
  },
  options: {
    landscape: {
      small: {
        heightImageRatio: 0.4,
        imageScrollSpeed: 0.75,
        imageOffset: 180,
      },
      medium: {
        heightImageRatio: 0.4,
        imageScrollSpeed: 0.75,
        imageOffset: 200,
      },
      large: {
        heightImageRatio: 0.35,
        imageScrollSpeed: 0.75,
        imageOffset: 250,
      },
    },
    portrait: {
      heightImageRatio: 0.75,
      imageScrollSpeed: 0.35,
      imageOffset: 0,
    },
    intersectAbove: 250,
    // When a parallax is used as a top hero gfx, viewportStartScrollPos is set to 0.
    viewportStartScrollPos: 0,
    showStats: false,
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
    scrollSpeed: 1.0,
  },
  options: {
    landscape: {
      small: {
        heightImageRatio: 0.4,
        imageScrollSpeed: 0.5,
        imageOffset: 0,
      },
      medium: {
        heightImageRatio: 0.35,
        imageScrollSpeed: 0.5,
        imageOffset: 0,
      },
      large: {
        heightImageRatio: 0.3,
        imageScrollSpeed: 0.5,
        imageOffset: 0,
      },
    },
    portrait: {
      heightImageRatio: 0.75,
      imageScrollSpeed: 0.15,
      imageOffset: 0,
    },
    intersectAbove: 250,
    viewportStartScrollPos: 1.0,
    showStats: false,
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
    scrollSpeed: 1000.0,
  },
  options: {
    landscape: {
      small: {
        heightImageRatio: 0.4,
        imageScrollSpeed: 0.65,
        imageOffset: 0,
      },
      medium: {
        heightImageRatio: 0.35,
        imageScrollSpeed: 0.75,
        imageOffset: 0,
      },
      large: {
        heightImageRatio: 0.3,
        imageScrollSpeed: 0.95,
        imageOffset: 0,
      },
    },
    portrait: {
      heightImageRatio: 0.75,
      imageScrollSpeed: 0.3,
      imageOffset: 0,
    },
    intersectAbove: 250,
    viewportStartScrollPos: 1.0,
    showStats: false,
  },
};

const Body = () => (
  <div className="body">
    <Parallax data={parallaxTopData} />
    <Content />
    <Parallax data={parallaxMiddleData} />
    <Content />
    <Parallax data={parallaxBottomData} />
  </div>
);

export default Body;
