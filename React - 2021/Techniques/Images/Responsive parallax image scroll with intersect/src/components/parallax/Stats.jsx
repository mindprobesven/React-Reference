/* eslint-disable react/prop-types */
import React from 'react';

const Stats = ({ parallaxState, imageState, scrollState }) => (
  <div className="stats">
    <div className="stats__column">
      <div className="stats__left">[ PARALLAX ]</div>
    </div>
    <div className="stats__column">
      <div className="stats__left">Aspect ratio:</div>
      <div className="stats__right">
        {`${parallaxState.aspectRatio}%`}
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left">Window Top:</div>
      <div className="stats__right">
        {`${parallaxState.windowTop.toFixed(1)}`}
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left">Height:</div>
      <div className="stats__right">
        {`${parallaxState.height.toFixed(1)}`}
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left">Viewport Bot:</div>
      <div className="stats__right">
        {`${parallaxState.viewportBot.toFixed(1)}`}
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left">Content Scroll:</div>
      <div className="stats__right">
        {`${parallaxState.contentScrollPercent}%`}
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left">[ IMAGE ]</div>
    </div>
    <div className="stats__column">
      <div className="stats__left">TranslateY:</div>
      <div className="stats__right">
        {`${-imageState.translateY.toFixed(1)}`}
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left">Height:</div>
      <div className="stats__right">
        {`${imageState.height.toFixed(1)}`}
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left">[ SCROLL ]</div>
    </div>
    <div className="stats__column">
      <div className="stats__left">Real Scroll Y:</div>
      <div className="stats__right">
        {`${scrollState.realWindowScrollY}`}
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left">Computed Scroll Y:</div>
      <div className="stats__right">
        {`${scrollState.computedWindowScrollY.toFixed(1)}`}
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left">Scrollable Total:</div>
      <div className="stats__right">
        {`${scrollState.scrollableTotal.toFixed(1)}`}
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left">Scrollable Remain:</div>
      <div className="stats__right">
        {`${scrollState.scrollableRemain.toFixed(1)}`}
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left">Image Offset:</div>
      <div className="stats__right">
        {`${scrollState.imageOffset}`}
      </div>
    </div>
    <div className="stats__column">
      <div className="stats__left">Speed:</div>
      <div className="stats__right">
        {`${scrollState.imageScrollSpeed * 100}%`}
      </div>
    </div>
  </div>
);

export default Stats;
