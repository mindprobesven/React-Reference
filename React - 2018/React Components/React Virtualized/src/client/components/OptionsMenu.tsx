import * as React from 'react'
import {Component} from 'react'

interface IProps {
  readonly onAdd: () => any
}

class OptionsMenu extends Component<IProps, {}> {
  shouldComponentUpdate(nextProps: IProps, nextState: any) {
    if(nextState !== this.state) {
      return true
    }
    return false
  }
  
  render() {
    return (
      <div className="options-menu">
        <button className="button-add" onClick={() => this.props.onAdd()}>+ Add Item</button>
      </div>
    ) 
  }
}

export default OptionsMenu