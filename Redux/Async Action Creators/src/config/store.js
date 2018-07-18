import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger()

const configureStore = (preloadedState) => (
  createStore(
    rootReducer, 
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
)

export default configureStore
