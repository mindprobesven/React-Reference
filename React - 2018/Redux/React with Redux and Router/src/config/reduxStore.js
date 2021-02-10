import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers';

const loggerMiddleware = createLogger()

const configReduxStore = (preLoadedState) => createStore(
  rootReducer,
  preLoadedState,
  applyMiddleware(
    loggerMiddleware
  )
)

export default configReduxStore