/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

const Content = ({ scrolled }) => {
  useEffect(() => {
    console.log('<Content> Mounted!');
  }, []);

  useEffect(() => {
    // console.log('<Content> Updated!');
  }, [scrolled]);

  const computeTranslateXWithBoundaries = () => {
    const startScrollPercent = 60;
    const speed = 5;

    const translateX = (startScrollPercent * speed) + (100 - (scrolled * speed));
    // console.log(translateX);

    if (translateX > 100) {
      return 100;
    }

    if (translateX >= 0 && translateX <= 100) {
      return translateX;
    }
    return 0;
  };

  return (
    <div className="parallax__content-container">
      <div className="parallax__animation">
        <div
          className="parallax__headline"
          style={{
            transform: `translateX(${computeTranslateXWithBoundaries()}%)`,
          }}
        >
          <h1>PARALLAX</h1>
        </div>
        <div
          className="parallax__decoration-box"
          style={{
            transform: `translateX(${-computeTranslateXWithBoundaries()}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default Content;
