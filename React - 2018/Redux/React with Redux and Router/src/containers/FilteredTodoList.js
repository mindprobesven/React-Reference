import { connect } from 'react-redux'
import TodoList from '../components/TodoList';
import { toggleTodo, FILTERS } from '../actions';

const getFilteredTodos = (todos, filter) => {
  switch(filter) {
    case FILTERS.SHOW_ALL:
      return todos
    case FILTERS.SHOW_PENDING:
      return todos.filter(todo => !todo.completed)
    case FILTERS.SHOW_COMPLETE:
      return todos.filter(todo => todo.completed)
    default:
      throw new Error('Unknown Filter!')
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: getFilteredTodos(state.todos, ownProps.filter)
})

const mapDispatchToProps = (dispatch) => ({
  toggleTodo: (id) => dispatch(toggleTodo(id)) 
})

const FilteredTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList)

export default FilteredTodoList