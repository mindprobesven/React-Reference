/*
----------------------------------------------------------------------------------

react-redux Hooks API

----------------------------------------------------------------------------------
*/

// import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';

import './sass/main.scss';

import initStore from './redux/initStore';

import ErrorBoundary from './components/ErrorBoundary';
import List from './components/List';

const store = initStore();

const App = () => (
  /* As with connect(), start by wrapping the entire application in a <Provider> */
  <Provider store={store}>
    <div className="app">
      <ErrorBoundary>
        <div className="body">
          <div className="single-column">
            <List categoryId="posts" />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  </Provider>
);

// export default hot(App);
export default App;
