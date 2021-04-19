/* eslint-disable max-len */
// import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';

import './sass/main.scss';

import store from './redux/store';

import ErrorBoundary from './components/ErrorBoundary';
import Counter from './components/Counter';
import Form from './components/Form';
import List from './components/List';

import CSSTransitionBasics from './1-CSSTransitionBasics/CSSTransitionBasics';

const App = () => (
  <Provider store={store}>
    <div className="app">
      <ErrorBoundary>
        <div className="body">
          <div className="single-column">
            <CSSTransitionBasics />
          </div>
        </div>
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
