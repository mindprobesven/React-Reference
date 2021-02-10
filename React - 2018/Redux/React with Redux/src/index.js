import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'

// These are for testing the update logic directly in this module
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './actions/index';

/*
You can optionally specify an initial state as the second argument
const store = createStore(rootReducer, window.STATE_FROM_SERVER)
*/
const store = createStore(rootReducer)

/*
Testing the update logic without UI
*/
console.log(store.getState())

// Subscribe to state changes
// subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(addTodo('Wash the car'))
store.dispatch(addTodo('Charge drone batteries'))
store.dispatch(addTodo('Reboot Linux server'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL))

// Unsubscribe from the state change listener
unsubscribe()

//////////////////////////////////////////////////////////////////////////

/*
Some monkeypatching to log stuff every time an action is dispatched
This is bad practice in general. A better approach is using middleware.
*/

// First we create a monkeypatch function as a separate module
const patchStoreToAddLogging = (store) => {
  // Store the original dispatch function in next
  const next = store.dispatch
  // Create the replacement function, the monkeypatch, replacing store.dispatch
  store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching: ', action)
    console.log('next state: ', store.getState())
    // Do extra stuff like logging and execute the original dispatch function
    return next(action)
  }
}

patchStoreToAddLogging(store)

//////////////////////////////////////////////////////////////////////////

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);