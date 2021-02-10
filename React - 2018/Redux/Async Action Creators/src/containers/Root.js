import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../config/store'
import App from './App'

import { selectSubreddit } from '../actions'

const stateModel = {
  selectedSubreddit: 'Sven'
}

const store = configureStore()
//store.dispatch(selectSubreddit('Svens Subreddit'))
//console.log(store.getState())

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}