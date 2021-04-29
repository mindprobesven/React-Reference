// import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';

import './sass/main.scss';

import configureStore from './redux/configureStore';
// import { callApi } from './redux/reducers/remoteDataReducer';

import ErrorBoundary from './components/ErrorBoundary';

// import Counter from './components/Counter';
// import Form from './components/Form';
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
