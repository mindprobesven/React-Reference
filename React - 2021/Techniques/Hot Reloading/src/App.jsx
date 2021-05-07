/*
----------------------------------------------------------------------------------

Hot Reloading

- React Hot Loader
Tweak React components in real time

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
// webpack.conf
...
resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
}
----------------------------------------------------------------------------------
*/

// import 'react-hot-loader' in main file (before React)
import { hot } from 'react-hot-loader/root';

import React from 'react';
import { Provider } from 'react-redux';

import './sass/main.scss';

import initStore from './redux/initStore';

import ErrorBoundary from './components/ErrorBoundary';
import HotReloadComponent from './components/HotReloadComponent';
// import List from './components/List';

const store = initStore();

const App = () => (
  <Provider store={store}>
    <div className="app">
      <ErrorBoundary>
        <div className="body">
          <div className="single-column">
            <HotReloadComponent />
            {/* <List categoryId="posts" /> */}
          </div>
        </div>
      </ErrorBoundary>
    </div>
  </Provider>
);

// Mark root component as hot-exported
export default hot(App);
