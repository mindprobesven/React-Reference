/*
----------------------------------------------------------------------------------

Hot Module Reloading with react-hot-loader

This example explains:

1. How to setup react-hot-loader to tweak React components in real time and preserve
component and Redux state during HMR.

Explained in:
./App.jsx
./components/HotReloadComponent.jsx
./redux/initStore.js

[OBSERVATIONS]
- useState() is presevered
- useEffect() updates during HMR
- In React.memo() wrapped components useEffect() does not update and the component
does not re-render when making modifications.

2. How to preserve the Redux state during HMR when making changes to the rootReducer
file. Pretty much useless, because making changes to any of the other Redux modules (actions,
slices, etc.) resets the Redux state.

Explained in:
./redux/initStore.js

----------------------------------------------------------------------------------

Setup - react-hot-loader

Package installation:
npm install --save-dev react-hot-loader

Note: You can safely install react-hot-loader as a regular dependency instead of a
dev dependency as it automatically ensures it is not executed in production and the
footprint is minimal.

1. Add react-hot-loader/babel to .babelrc
// .babelrc
{
  "plugins": ["react-hot-loader/babel"]
}

2. Adding Hooks support.

Requires the @hot-loader/react-dom package.

Package installation:
npm install --save-dev @hot-loader/react-dom

OR if an error occurs due to a newer react version being available, force the installation
of the currently installed react version with;
npm install --save-dev @hot-loader/react-dom --force

3. Configure your webpack development configuration to alias this package, instead of the
real 'react-dom'
// webpack.dev.js
...
resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
}
----------------------------------------------------------------------------------
*/

// ----------------------------------------------------------------------------------
// import 'react-hot-loader' in main file (before React)
// ----------------------------------------------------------------------------------
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';

import React from 'react';
import { Provider } from 'react-redux';

import './sass/main.scss';

import store from './redux/initStore';

import ErrorBoundary from './components/ErrorBoundary';
import HotReloadComponent from './components/HotReloadComponent';
import List from './components/List';

// ----------------------------------------------------------------------------------
// It is possible to configure how hooks (useEffect, etc.) reload on react hot load (RHL).
// ----------------------------------------------------------------------------------
setConfig({
  // [OPTION #1]
  // This will reload ANY hook, including useEffect(, []) 'on mount only', making it possible
  // to reflect modifications to components wrapped with React.memo
  // reloadLifeCycleHooks: true,
  // reloadHooks: true,

  // [OPTION #2]
  // This will reload all hooks, not including useEffect(, []) 'on mount only'. It does not
  // reflect modifications to components wrapped with React.memo
  // reloadLifeCycleHooks: false,
  // reloadHooks: true,

  // [OPTION #3]
  // This disables hooks reloading. It only reloads the hook useEffect(effect) in components
  // which are not wrapped with React.memo
  reloadHooks: false,
});

const App = () => (
  <Provider store={store}>
    <div className="app">
      <ErrorBoundary>
        <div className="body">
          <div className="single-column">
            <HotReloadComponent />
            <HotReloadComponent />
            <List categoryId="posts" />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  </Provider>
);

// ----------------------------------------------------------------------------------
// Mark root component as hot-exported
// ----------------------------------------------------------------------------------
export default hot(App);
