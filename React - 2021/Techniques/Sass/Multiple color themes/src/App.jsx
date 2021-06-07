/*
---------------------------------------------------------------------------------------------

Multiple color themes with Sass

This example demonstrates an easy method to add multiple color themes to individual React
components using Sass maps and mixins. It also shows how to setup a default theme to be used
in case no theme is specified.

- Themes are created using maps. Example: ./sass/themes and then imported in the main.scss

- A default theme is created in the global scope. Example: ./sass/abstracts/_variables.scss

- A Sass component can generate the styles for one, multiple or all themes using a mixin.
Example: ./sass/components/_box.scss

- A component element is themed by simply adding the theme's class name as the fist item in
its class list. If no theme is specified, the element uses a default theme.
Example: ./components/Box.jsx

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
      <Box label="DEFAULT THEME" />
    </ErrorBoundary>
  </div>
);

export default hot(App);
