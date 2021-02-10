import React from 'react'
import FilterLink from '../components/FilterLink';
import { FILTERS } from '../actions';

const FilterLinkList = () => (
  <div>
    <FilterLink filter={FILTERS.SHOW_ALL}>SHOW ALL</FilterLink>
    {' '}
    <FilterLink filter={FILTERS.SHOW_PENDING}>SHOW PENDING</FilterLink>
    {' '}
    <FilterLink filter={FILTERS.SHOW_COMPLETE}>SHOW COMPLETE</FilterLink>
    {' '}
  </div>
)

export default FilterLinkList