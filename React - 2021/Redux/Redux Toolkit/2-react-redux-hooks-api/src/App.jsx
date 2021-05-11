/*
----------------------------------------------------------------------------------

react-redux - Hooks API

useDispatch()
- This hook returns a reference to the dispatch function from the Redux store.
Explained in ./components/List.jsx

useSelector()
- Allows you to extract data from the Redux store state, using a 'selector function'.
Explained in ./components/Status.jsx

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
