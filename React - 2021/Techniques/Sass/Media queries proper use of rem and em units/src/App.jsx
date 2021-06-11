/*
---------------------------------------------------------------------------------------------

Media queries with Sass

- Creating a media query breakpoints map
Example: _variables.scss

- Creating a media query mixin which can be included in any component
Example: _mixins.scss
Include example: _box-em.scss

- Proper use of the "rem" unit to control font-size, padding and margins app-wide.
- Proper use of the "em" unit to control font-size, padding and margins for a specific component.
Example:
_base.scss
_box-rem.scss
_box-em.scss

---------------------------------------------------------------------------------------------
*/
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';

import React from 'react';

import './sass/main.scss';

import ErrorBoundary from './components/ErrorBoundary';
import BoxRem from './components/BoxRem';
import BoxEm from './components/BoxEm';

setConfig({
  reloadLifeCycleHooks: true,
  reloadHooks: true,
});

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <BoxRem />
      <BoxEm />
    </ErrorBoundary>
  </div>
);

export default hot(App);
