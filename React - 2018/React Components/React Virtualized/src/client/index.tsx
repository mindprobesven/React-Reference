import * as React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import './index.scss'

// FOUC hack using a delayed render (Development mode only!)
setTimeout(() => {
  render(
    <Root />,
    document.getElementById('root') as HTMLElement
  )
}, 50)