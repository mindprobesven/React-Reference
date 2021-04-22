/* eslint-disable react/jsx-boolean-value */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// ----------------------------------------------------------------------------------
//
// CSSTransition component
//
// CSSTransition is a wrapper component that adds to the wrapped element a pair of
// 'class names' during the appear, enter and exit states of a transition.
//
// ----------------------------------------------------------------------------------

import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const ListText = ({ title }) => (
  <div className="list__text">
    <p>{title}</p>
  </div>
);

const CSSTransitionMethods = () => {
  const [isVisible1, setIsVisible1] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);
  const [isVisible5, setIsVisible5] = useState(false);

  return (
    <div className="list">
      <div className="list__item">
        <CSSTransition
          // Triggers the enter and exist states
          in={isVisible5}
          // timeout is the duration of the entire transition. onEntered and onExited are called after the timeout.
          timeout={1000}
          // The set of classes for the enter, appear and exist transitions (./sass/transitions/_fade.scss)
          classNames="fade"
          // Mounts the component at enter
          mountOnEnter
          // Unmounts the component on exit
          unmountOnExit
          // Event callacks
          onEnter={() => console.log('onEnter')}
          onEntering={() => console.log('onEntering')}
          onEntered={() => console.log('onEntered')}
          onExit={() => console.log('onExit')}
          onExiting={() => console.log('onExiting')}
          onExited={() => console.log('onExited')}
        >
          <ListText title="Enter and exit callbacks" />
        </CSSTransition>
        <button
          className="button"
          type="button"
          onClick={() => setIsVisible5(!isVisible5)}
        >
          Toggle
        </button>
      </div>

      {/* -------------------------------------------------------------------------------- */}

      <div className="list__item">
        <CSSTransition
          in={isVisible4}
          timeout={300}
          classNames="fade"
          mountOnEnter
          unmountOnExit
          // Manually disables the exit transition
          exit={false}
          enter={true}
        >
          <ListText title="Starts unmounted, exits unmounted with fade disabled, with fade toggle" />
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
          // Setting in = true and appear = true will automatically play the enter transition on mount.
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

export default CSSTransitionMethods;
