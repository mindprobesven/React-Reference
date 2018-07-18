import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import configReduxStore from '../config/reduxStore';
import App from './App';

// Temp for testing
import { addTodo } from '../actions';

const store = configReduxStore()

store.dispatch(addTodo('Eat food'))
store.dispatch(addTodo('Wash car'))
store.dispatch(addTodo('Reboot server'))
console.log(store.getState())

const Root = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path='/:filter?' component={App} />
      </div>
    </Router>
  </Provider>
)

export default Root