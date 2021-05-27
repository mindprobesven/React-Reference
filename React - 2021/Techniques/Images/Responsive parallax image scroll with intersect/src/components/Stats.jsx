/* eslint-disable react/prop-types */
import React from 'react';

const Stats = ({ parallaxState, imageState, scrollState }) => (
  <div className="stats">
    <div className="stats__column">
      <div className="stats__left"><p>[ PARALLAX ]</p></div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Aspect ratio:</p></div>
      <div className="stats__right">
        <p>{`${parallaxState.aspectRatio}%`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Window Top:</p></div>
      <div className="stats__right">
        <p>{`${parallaxState.windowTop.toFixed(1)}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Height:</p></div>
      <div className="stats__right">
        <p>{`${parallaxState.height.toFixed(1)}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>[ IMAGE ]</p></div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>TranslateY:</p></div>
      <div className="stats__right">
        <p>{`${-imageState.translateY.toFixed(1)}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Height:</p></div>
      <div className="stats__right">
        <p>{`${imageState.height.toFixed(1)}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>[ SCROLL ]</p></div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Intersecting:</p></div>
      <div className="stats__right">
        <p>{`${scrollState.isParallaxIntersecting}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Real Scroll Y:</p></div>
      <div className="stats__right">
        <p>{`${scrollState.realWindowScrollY}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Computed Scroll Y:</p></div>
      <div className="stats__right">
        <p>{`${scrollState.computedWindowScrollY}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Scrollable Total:</p></div>
      <div className="stats__right">
        <p>{`${scrollState.scrollableTotal.toFixed(1)}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Scrollable Remain:</p></div>
      <div className="stats__right">
        <p>{`${scrollState.scrollableRemain.toFixed(1)}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Image Offset:</p></div>
      <div className="stats__right">
        <p>{`${scrollState.imageOffset}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Speed:</p></div>
      <div className="stats__right">
        <p>{`${scrollState.imageScrollSpeed * 100}%`}</p>
      </div>
    </div>
  </div>
);

export default Stats;
