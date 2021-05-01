/*
----------------------------------------------------------------------------------

Handling async API calls using Redux Saga

In the example 5-async-api-calls-with-redux-thunk, the async API call logic was put
directly inside the action creator callApi(). Although this works, a better approach
is to have a clear separation between synchcronous and asynchcronous logic. To achieve
this, there is redux-saga, a Redux middleware for managing side effects. With redux-saga
you can have a separate thread in your application for dealing with impure actions: API
calls, storage access, and more.

In this example, we move the async API call logic from the Redux thunk callAPI() into a
Redux saga (./redux/sagas/apiSaga.js)

----------------------------------------------------------------------------------
*/

// import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';

import './sass/main.scss';

import configureStore from './redux/configureStore';

import ErrorBoundary from './components/ErrorBoundary';
import List from './components/List';

const store = configureStore();

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
