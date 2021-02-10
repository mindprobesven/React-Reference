import * as React from 'react'
import { Component } from 'react'

const STATUS = {
  NORMAL: 'normal',
  HOVERED: 'hovered'
}

interface IProps {
  page: string
}

class Link extends Component<IProps, {}>{
  state = {
    status: STATUS.NORMAL
  }
  
  mouseEnter = () => this.setState({ status: STATUS.HOVERED })
  mouseLeave = () => this.setState({ status: STATUS.NORMAL })

  render() {
    const { status } = this.state
    const { page, children } = this.props
    
    return (
      <a className={status} href={page || '#'} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        {children}
      </a>
    )
  }
}

export default Link