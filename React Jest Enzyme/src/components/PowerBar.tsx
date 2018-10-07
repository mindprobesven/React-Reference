import * as React from 'react'
import { Component } from 'react'

interface IProps {
  name: string,
  powerLevel?: number
}

class PowerBar extends Component<IProps, {}> {
  render() {
    const {name, powerLevel = 1 } = this.props

    powerLevel <= 0 && error('Game Over!')

    return (
      <div>
        <h3 className="greeting">Hello Player {name} !</h3>
        <p className="powerLevel">Power: {createPowerBar(powerLevel)}</p>
      </div>
    )
  }
}

export default PowerBar

const createPowerBar = (value: number) : string => Array(value + 1).join('+')

const error = (desc: string) : void => {throw new Error(desc)}