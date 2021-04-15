/* eslint-disable max-len */
// import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';

import './sass/main.scss';

import ErrorBoundary from './components/ErrorBoundary';
import Counter from './components/Counter';
import Form from './components/Form';
import List from './components/List';

import store, { addArticle } from './redux/store';

// ----------------------------------------------------------------------------------

// The Redux store has just three methods.

// Returns the current state
console.log(store.getState());

// Listens for state updates
store.subscribe(() => console.log('Redux state upated'));

// To change the state we dispatch an action
store.dispatch(addArticle('Adding an article title via store.dispatch'));

// Returns the current state after having dispatched the action addArticle(payload)
console.log(store.getState());

// ----------------------------------------------------------------------------------

const App = () => (
  // With the react-redux library the Redux store is connected to React components
  // The 'Prodiver' is a wrapper component from react-redux and provides the Redux store
  <Provider store={store}>
    <div className="app">
      <ErrorBoundary>
        <div className="body">
          <div className="double-column">
            <div className="double-column__container" style={{ width: '20%' }}>
              <Counter />
            </div>
            <div className="double-column__container" style={{ width: '80%' }}>
              <Form />
            </div>
          </div>
          <div className="single-column">
            <List />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  </Provider>
);

// export default hot(App);
export default App;
