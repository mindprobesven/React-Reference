/* eslint-disable max-len */
// import { hot } from 'react-hot-loader/root';
/*
----------------------------------------------------------------------------------
Refactoring and best practices

In 3_redux-thunk all the Redux code is inside /redux/store.js; constants, action creators, reducer, etc.
Now it is time to apply some best practices to create a file structure, split reducer logic, normalize
the state shape and initializing the states.

1. Defining an app's state shape:
Most aplications deal with multiple types of data which can be broadly divided into three categories;
Domain data, app state and UI state.

{
    domainData1 : {},
    domainData2 : {},
    appState1 : {},
    appState2 : {},
    ui : {
        uiState1 : {},
        uiState2 : {},
    }
}

2. Normalizing state shape
The basic concepts of normalizing data are:

- Each type of data gets its own "table" in the state.
- Each "data table" should store the individual items in an object, with the IDs of the items as keys
  and the items themselves as the values.
- Any 'references' to individual items should be done by storing the item's ID.
- Arrays of IDs should be used to indicate ordering.

{
    posts : {
        byId : {
            "post1" : {
                id : "post1",
                author : "user1",
                body : "......",
                comments : ["comment1", "comment2"]
            },
            "post2" : {
                id : "post2",
                author : "user2",
                body : "......",
                comments : ["comment3", "comment4", "comment5"]
            }
        },
        allIds : ["post1", "post2"]
    },
    comments : {
        byId : {
            "comment1" : {
                id : "comment1",
                author : "user2",
                comment : ".....",
            },
            "comment2" : {
                id : "comment2",
                author : "user3",
                comment : ".....",
            },
            "comment3" : {
                id : "comment3",
                author : "user3",
                comment : ".....",
            },
            "comment4" : {
                id : "comment4",
                author : "user1",
                comment : ".....",
            },
            "comment5" : {
                id : "comment5",
                author : "user3",
                comment : ".....",
            },
        },
        allIds : ["comment1", "comment2", "comment3", "comment4", "comment5"]
    },
    users : {
        byId : {
            "user1" : {
                username : "user1",
                name : "User 1",
            },
            "user2" : {
                username : "user2",
                name : "User 2",
            },
            "user3" : {
                username : "user3",
                name : "User 3",
            }
        },
        allIds : ["user1", "user2", "user3"]
    }
}

3. Splitting reducer logic
The state management is split into two reducers, which are combined in a rootReducer.

- articlesReducer: Articles data, adding and deleting articles.
- UIReducer: Manages visibility of a status UI component with SUCCESS and ERROR notifications.

4. Configuring the store
All the logic related to configuring the store - including initial state, importing reducers,
middleware, and enhancers - is handled in a dedicated file (configureStore.js)

----------------------------------------------------------------------------------
*/
import React from 'react';
import { Provider } from 'react-redux';

import './sass/main.scss';

import configureStore from './redux/configureStore';

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
            <List />
          </div>
        </div>
        {/* <div className="body">
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
        </div> */}
      </ErrorBoundary>
    </div>
  </Provider>
);

// export default hot(App);
export default App;
