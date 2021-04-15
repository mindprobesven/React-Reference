/* eslint-disable max-len */
// import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';

import './sass/main.scss';

import ErrorBoundary from './components/ErrorBoundary';
import Counter from './components/Counter';
import Form from './components/Form';
import List from './components/List';

import store from './redux/store';
import ErrorStatus from './components/ErrorStatus';

const App = () => (
  <Provider store={store}>
    <div className="app">
      <ErrorBoundary>
        <div className="body">
          <ErrorStatus />
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
