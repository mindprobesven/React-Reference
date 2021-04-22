/* eslint-disable max-len */
// import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './sass/main.scss';

import ErrorBoundary from './components/ErrorBoundary';
import RoutesWithTransition from './components/RoutesWithTransition';

/* import CSSTransitionMethods from './1-CSSTransition/CSSTransitionMethods';
import TransitionGroupMethods from './2-TransitionGroup/TransitionGroupMethods';
import FadeSequenceList from './2-TransitionGroup/FadeSequenceList';
import SwitchTransitionMethods from './3-SwitchTransition/SwitchTransitionMethods';
import FadeOverContainer from './2-TransitionGroup/FadeOverContainer'; */

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <Router>
        <div className="header">
          <ul className="menu">
            <li className="menu__button">
              <Link to="/">Home</Link>
            </li>
            <li className="menu__button">
              <Link to="/about">About</Link>
            </li>
            <li className="menu__button">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
        <div className="body">
          <RoutesWithTransition />
        </div>
      </Router>
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
