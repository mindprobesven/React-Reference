/*
Reducers specify how the applications state changes in response to Actions
sent to the store. The reducer is a pure function that takes the previous
state and an action and returns the next state.

Things that should never be done in a reducer:
1. Mutate its arguments
2. Perform side effects like API calls or routing transitions
3. Call non-pure functions e.g. Date.now() or Math.random()
*/

/*
Redux will call our reducer with an "undefined" state for the first time.
We can specify an initital state e.g. state = []
*/
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
    /*  
     We don't mutate the "state". We create a copy using Object.assign() or
     a spread operator proposal { ...state, ...newState }
    */
    return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo => 
        (todo.id === action.id) ? {...todo, completed: !todo.completed } : todo
      )
    default:
      // Always return the previous state for the default case for any unknown action
      return state
  }
}

export default todos