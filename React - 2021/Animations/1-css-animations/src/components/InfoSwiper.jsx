/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React, { forwardRef } from 'react';

const InfoSwiper = forwardRef(({ data, handleClick }, ref) => (
  <div className="info-swiper" ref={ref}>
    <div className="info-swiper__button info-swiper__button--open" onClick={handleClick}>+</div>
    <div className="info-swiper__button info-swiper__button--close" onClick={handleClick}>-</div>
    <div className="info-swiper__content">
      <h3>{data.title}</h3>
      <p>{data.text}</p>
    </div>
  </div>
));

export default InfoSwiper;
