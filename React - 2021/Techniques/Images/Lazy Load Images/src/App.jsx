/* eslint-disable no-unused-vars */
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
  </div>
);

export default hot(App);
