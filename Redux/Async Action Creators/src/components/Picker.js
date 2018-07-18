import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Picker extends Component {
  render() {
    const { value, options, onChange } = this.props
    
    return(
      <span>
        <h1>{value}</h1>
        <select value={value} onChange={e => onChange(e.target.value)}>
          {
            options.map(option => (
              <option key={option}>{option}</option>
            ))
          }
        </select>
      </span>
    )
  }
}