import { combineReducers } from 'redux'
import { 
  SELECT_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  INVALIDATE_SUBREDDIT
} from '../actions'

const selectedSubreddit = (state = 'reactjs', action) => {
  switch(action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

const posts = (state={
  isFetching: false,
  didInvalidate: false,
  items: []
}, 
action) => {
  switch(action.type) {
    case INVALIDATE_SUBREDDIT:
      return {...state, 
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {...state, 
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {...state, 
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.lastUpdated
      }
    default:
      return state
  }
}

const postsBySubreddit = (state = {}, action) => {
  switch(action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
    return {
      /*
      We create a subreddit object and use reducer composition to set the
      properties based on action types
      1. REQUEST_POSTS only sets the isFetching property to true
      2. RECEIVE_POSTS sets isFetching to false and stores the post items
      */
      [action.subreddit]: posts(state[action.subreddit], action)
    }
    default:
    return state
  }
}

const rootReducer = combineReducers({
  selectedSubreddit,
  postsBySubreddit
})

export default rootReducer