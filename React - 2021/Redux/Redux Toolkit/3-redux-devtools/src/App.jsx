/*
----------------------------------------------------------------------------------

Redux DevTools

Chrome extension installation:
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

- Enabling Redux DevTools integration
Set the 'devTools' property in configureStore() to be 'true' in development mode.

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
