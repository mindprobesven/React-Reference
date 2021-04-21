/* eslint-disable max-len */
// import { hot } from 'react-hot-loader/root';
import React from 'react';

import './sass/main.scss';

import ErrorBoundary from './components/ErrorBoundary';

import CSSTransitionMethods from './1-CSSTransition/CSSTransitionMethods';
import TransitionGroupMethods from './2-TransitionGroup/TransitionGroupMethods';
import FadeSequenceList from './2-TransitionGroup/FadeSequenceList';
import SwitchTransitionMethods from './3-SwitchTransition/SwitchTransitionMethods';
import FadeOverContainer from './2-TransitionGroup/FadeOverContainer';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <div className="container">
        <h3 className="container__header">SwitchTransition</h3>
        {/* Animated enter and exit transitions when switching between elements */}
        <FadeOverContainer />
      </div>
      <div className="container">
        <h3 className="container__header">SwitchTransition</h3>
        {/* Animated enter and exit transitions when switching between elements */}
        <SwitchTransitionMethods />
      </div>
      <div className="container">
        <h3 className="container__header">TransitionGroupMethods - FadeSequenceList</h3>
        <FadeSequenceList />
      </div>
      <div className="container">
        <h3 className="container__header">TransitionGroupMethods</h3>
        {/* Animated enter and exit transitions of a list of elements */}
        <TransitionGroupMethods />
      </div>
      <div className="container">
        <h3 className="container__header">CSSTransitionMethods</h3>
        {/* Animated enter and exit transitions of a single element */}
        <CSSTransitionMethods />
      </div>
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
