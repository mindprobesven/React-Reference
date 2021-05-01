/*
----------------------------------------------------------------------------------

Redux Toolkit

npm install --save @reduxjs/toolkit

----------------------------------------------------------------------------------
*/

// import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';

import './sass/main.scss';

// import configureStore from './redux/configureStore';
import initStore from './redux/configureStore';

import { UPDATE_REMOTE_DATA_STATE } from './redux/constants/remoteData';

import ErrorBoundary from './components/ErrorBoundary';
// import List from './components/List';

// const store = configureStore();
const store = initStore();
store.dispatch({ type: UPDATE_REMOTE_DATA_STATE });
console.log(store.getState());

const App = () => (
  <Provider store={store}>
    <div className="app">
      <ErrorBoundary>
        <div className="body">
          {/* <div className="single-column">
            <List categoryId="posts" />
          </div> */}
        </div>
      </ErrorBoundary>
    </div>
  </Provider>
);

// export default hot(App);
export default App;
