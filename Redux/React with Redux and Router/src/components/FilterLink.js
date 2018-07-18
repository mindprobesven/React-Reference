import React from 'react'
import { NavLink } from 'react-router-dom'
import { FILTERS } from '../actions';

const FilterLink = ({ filter, children }) => (
  //<NavLink to={filter === FILTERS.SHOW_ALL ? '/' : `/${filter}`} activeStyle={{
  <NavLink to={`/${filter}`} activeStyle={{
    textDecoration: 'none',
    color: 'red'
  }}>
    {children}
  </NavLink>
)

export default FilterLink