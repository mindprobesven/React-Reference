/*
----------------------------------------------------------------------------------

Redux Toolkit

In this guide, we take the example app from (/Redux Classic/6-async-api-calls-with-redux-saga)
and refactor it to use the new Redux Toolkit.

- Redux Toolkit package installation

npm install --save @reduxjs/toolkit

Packages now obsolete and can be uninstalled; redux and redux-thunk

----------------------------------------------------------------------------------

The Redux Toolkit included these APIs:

- configureStore(): wraps createStore to provide simplified configuration options
and good defaults. It can automatically combine your slice reducers, adds whatever
Redux middleware you supply, includes redux-thunk by default, and enables use of
the Redux DevTools Extension.

Explained in ./initStore.js

- createReducer(): Lets you supply a lookup table of action types to case reducer
functions, rather than writing switch statements. In addition, it automatically uses
the immer library to let you write simpler immutable updates with normal mutative code,
like state.todos[3].completed = true.

Explained in ./createReducerExample.js

- createSlice(): accepts an object of reducer functions, a slice name, and an initial
state value, and automatically generates a slice reducer with corresponding action
creators and action types.

Explained in ./slices/remoteDataSlice.js

- createAction(): generates an action creator function for the given action type
string. The function itself has toString() defined, so that it can be used in place
of the type constant.

Explained in ./actions/remoteData.js

- createAsyncThunk(): accepts an action type string and a function that returns a promise,
and generates a thunk that dispatches pending/fulfilled/rejected action types based on
that promise.

Explained in ./actions/remoteData.js

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
