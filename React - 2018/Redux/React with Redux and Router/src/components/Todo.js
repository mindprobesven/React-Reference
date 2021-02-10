import React from 'react'

const Todo = ({ id, text, completed, onClick }) => (
  <li onClick={onClick} style={{
    textDecoration: completed ? 'line-through' : 'none' 
  }}>
    {`${id}: ${text}`}
  </li>
)

export default Todo