/* eslint-disable no-unused-vars */
/*
----------------------------------------------------------------------------------------

Lazy loading images when they enter the viewport

This example shows how to detect when an image placeholder <div> enters into the viewport
from the bottom during scrolling. As soon as the image placeholder is 10% visible, the
image inside it is loaded.

This example performs the following image lazy loading process:

1. First an image placeholder is shown at the same size of the image to prevent reflow.
2. When the image placeholder enters the viewport, it starts to load two versions of an image.
A small thumbnail that is shown blurry and the full version.
3. When the full version is loaded, it fades in on top of the thumbnail. After the fade-in
transition completes, the thumbnail is hidden.

This example uses the 'Intersection Observer API', which provides a way to asynchronously observe
changes in the intersection of a target element with an ancestor element or with a top-level
document's viewport.

Explained in ./src/hooks/useIntersectionObserver.jsx

----------------------------------------------------------------------------------------
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
  reloadLifeCycleHooks: false,
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
