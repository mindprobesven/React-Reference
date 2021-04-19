/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const ListText = ({ title }) => (
  <div className="list__text">
    <p>{title}</p>
  </div>
);

const CSSTransitionBasics = () => {
  console.log('CSSTransitionBasics');

  const [isVisible1, setIsVisible1] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);

  return (
    <div className="list">
      <div className="list__item">
        <CSSTransition
          in={isVisible4}
          timeout={300}
          classNames="fade"
          mountOnEnter
          unmountOnExit
          exit={false}
        >
          <ListText title="Starts unmounted, exits unmounted without fade, with fade toggle" />
        </CSSTransition>
        <button
          className="button"
          type="button"
          onClick={() => setIsVisible4(!isVisible4)}
        >
          Toggle
        </button>
      </div>

      {/* -------------------------------------------------------------------------------- */}

      <div className="list__item">
        <CSSTransition
          in={isVisible3}
          timeout={300}
          classNames="fade"
          mountOnEnter
          unmountOnExit
        >
          <ListText title="Starts unmounted, exits unmounted, with fade toggle" />
        </CSSTransition>
        <button
          className="button"
          type="button"
          onClick={() => setIsVisible3(!isVisible3)}
        >
          Toggle
        </button>
      </div>

      {/* -------------------------------------------------------------------------------- */}

      <div className="list__item">
        <CSSTransition
          in={isVisible2}
          appear
          timeout={300}
          classNames="fade"
        >
          <ListText title="Starts mounted with fade-in, exits mounted, with fade toggle" />
        </CSSTransition>
        <button
          className="button"
          type="button"
          onClick={() => setIsVisible2(!isVisible2)}
        >
          Toggle
        </button>
      </div>

      {/* -------------------------------------------------------------------------------- */}

      <div className="list__item">
        <CSSTransition
          in={isVisible1}
          timeout={300}
          classNames="fade"
        >
          <ListText title="Starts mounted and visible, exits mounted, with fade toggle" />
        </CSSTransition>
        <button
          className="button"
          type="button"
          onClick={() => setIsVisible1(!isVisible1)}
        >
          Toggle
        </button>
      </div>
    </div>
  );
};

export default CSSTransitionBasics;
