/* eslint-disable no-unused-vars */
/*
---------------------------------------------------------------------------------------------

Different color schemes

---------------------------------------------------------------------------------------------
*/
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';

import React from 'react';

import './sass/main.scss';

import ErrorBoundary from './components/ErrorBoundary';
import Box from './components/Box';

setConfig({
  reloadLifeCycleHooks: true,
  reloadHooks: true,
});

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <Box theme="theme-blue" label="BLUE THEME" />
      <Box theme="theme-pink" label="PINK THEME" />
    </ErrorBoundary>
  </div>
);

export default hot(App);
