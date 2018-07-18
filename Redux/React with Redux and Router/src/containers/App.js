import React, { Component } from 'react'
import FilteredTodoList from './FilteredTodoList';
import FilterLinkList from '../components/FilterLinkList';
import { FILTERS } from '../actions';
import AddTodo from './AddTodo';

class App extends Component {
  render() {
    const { match: { params } } = this.props
    
    return(
      <div>
        <AddTodo />
        <hr />
        <FilterLinkList />
        <hr />
        <FilteredTodoList filter={params.filter || FILTERS.SHOW_ALL} />
      </div>
    )
  }
}

export default App