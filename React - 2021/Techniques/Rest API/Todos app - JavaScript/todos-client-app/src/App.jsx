/* eslint-disable no-unused-vars */
/*
---------------------------------------------------------------------------------------------

Responsive parallax image scroller

Features:
- Smooth resizing and setting breakpoints for landscape and portrait orientation.

- Ability to set the image height, initial offset and scroll speed for each breakpoint.

---------------------------------------------------------------------------------------------
*/
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';

import React from 'react';

import './sass/main.scss';

import ErrorBoundary from './components/ErrorBoundary';
import Header from './containers/Header';
import Body from './containers/Body';
import Footer from './containers/Footer';

setConfig({
  reloadLifeCycleHooks: true,
  reloadHooks: true,
});

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <Header />
      <Body />
      <Footer />
    </ErrorBoundary>
    <div className="background" />
  </div>
);

export default hot(App);
