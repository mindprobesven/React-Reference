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
      <div className="stats__left"><p>Height:</p></div>
      <div className="stats__right">
        <p>{`${parallaxState.height.toFixed(1)}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>[ IMAGE ]</p></div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Trans Y:</p></div>
      <div className="stats__right">
        <p>{`${imageState.translateY.toFixed(1)}`}</p>
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
      <div className="stats__left"><p>Current Y:</p></div>
      <div className="stats__right">
        <p>{`${scrollState.currentScrollPosY}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Limit:</p></div>
      <div className="stats__right">
        <p>{`${scrollState.scrollLimit.toFixed(1)}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Image Offset:</p></div>
      <div className="stats__right">
        <p>{`${scrollState.imageOffset}`}</p>
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left"><p>Remain:</p></div>
      <div className="stats__right">
        <p>{`${scrollState.scrollRemaining.toFixed(1)}`}</p>
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
