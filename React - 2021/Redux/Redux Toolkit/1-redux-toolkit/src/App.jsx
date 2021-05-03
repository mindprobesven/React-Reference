/*
----------------------------------------------------------------------------------

Redux Toolkit

npm install --save @reduxjs/toolkit

The Redux Toolkit included these APIs:

- configureStore(): wraps createStore to provide simplified configuration options
and good defaults. It can automatically combine your slice reducers, adds whatever
Redux middleware you supply, includes redux-thunk by default, and enables use of
the Redux DevTools Extension.
Explained in ./initStore.js

- createAction(): generates an action creator function for the given action type
string. The function itself has toString() defined, so that it can be used in place
of the type constant.
Explained in ./actions/remoteData.js

- createReducer(): that lets you supply a lookup table of action types to case reducer
functions, rather than writing switch statements. In addition, it automatically uses
the immer library to let you write simpler immutable updates with normal mutative code,
like state.todos[3].completed = true.
Explained in ./reducers/remoteDataReducer.js

- createSlice(): accepts an object of reducer functions, a slice name, and an initial
state value, and automatically generates a slice reducer with corresponding action
creators and action types.
Explained in ./slices/remoteDataSlice.js

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

// import configureStore from './redux/configureStore';
import initStore from './redux/initStore';

// import { updateRemoteDataState } from './redux/actions/remoteData';

import ErrorBoundary from './components/ErrorBoundary';
import List from './components/List';

// const store = configureStore();
const store = initStore();
// store.dispatch(updateRemoteDataState('articles'));
// console.log(store.getState());

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
