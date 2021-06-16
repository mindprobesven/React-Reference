/* eslint-disable no-unused-vars */
/*
---------------------------------------------------------------------------------------------

Responsive parallax image scroller

---------------------------------------------------------------------------------------------
*/
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';

import React from 'react';

import './sass/main.scss';

import ErrorBoundary from './components/ErrorBoundary';
import Content from './components/Content';

setConfig({
  reloadLifeCycleHooks: true,
  reloadHooks: true,
});

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <Content />
    </ErrorBoundary>
    <div className="background" />
  </div>
);

export default hot(App);
