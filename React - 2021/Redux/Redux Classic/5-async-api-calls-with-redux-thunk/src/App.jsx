/*
----------------------------------------------------------------------------------

Handling async API calls using Redux Thunk

In this example, we have <List> component that can initiate API calls to load and show
a list of posts from a selected category. We also have a <Status> component to show if
API calls were successful or resulted in an error.

API calls are handled in the Redux Thunk action callAPI() (actions/remoteData.js)

This example has the logic to initially fetch the posts data of a category from an API and
store it in (remoteDataState). Further requests to a category previously stored are then
loaded from memory.

This example also shows how to pass a pre-loaded state to the Redux Store in configureStore.js
The posts data for category 'articles' is pre-loaded. When this category is selected in the
<List> component, it will be loaded from cache and bypass the API call.

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
            {/* The <List> receives an initial categoryId to fetch from the API */}
            <List categoryId="posts" />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  </Provider>
);

// export default hot(App);
export default App;
