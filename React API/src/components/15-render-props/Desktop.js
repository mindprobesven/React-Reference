import React, { Component } from 'react';
import './Desktop.scss';
import Mouse from './Mouse';
import Icon from './Icon';
import Trash from './Trash';

class Desktop extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      icons: [
        {
          id: 1,
          x: 50,
          y: 50,
          width: 50,
          height: 50,
          iconRef: React.createRef(),
          visible: true
        },
        {
          id: 2,
          x: 50,
          y: 125,
          width: 50,
          height: 50,
          iconRef: React.createRef(),
          visible: true
        },
        {
          id: 3,
          x: 50,
          y: 195,
          width: 50,
          height: 50,
          iconRef: React.createRef(),
          visible: true
        }
      ],
      trash: {
        x: 225,
        y: 225,
        width: 50,
        height: 50,
        iconRef: React.createRef()
      }
    };
  }
  
  handleClick = (iconRef, icon) => {
    const trashIconRect = this.state.trash.iconRef.current.getBoundingClientRect();
    const iconRect = iconRef.current.getBoundingClientRect();
    
    const trashPos = {
      x: trashIconRect.x  - 30 + 25,
      y: trashIconRect.y  - 30 + 25
    }

    const iconPos = {
      x: iconRect.x  - 30 + 25,
      y: iconRect.y  - 30 + 25
    }

    if(iconPos.x >= trashPos.x && iconPos.x < (trashPos.x + 50) && 
      iconPos.y >= trashPos.y && iconPos.y < (trashPos.y + 50)) {
      const filtered = this.state.icons.filter(element => {
        if(element.id !== icon.id) {
          return element;
        }
      });

      this.setState({ icons: filtered });
    }
  }
  
  render() {
    return (
      <div className="Desktop">
        <Mouse render={mouse => (
          <React.Fragment>
            {
              this.state.icons.map((icon) => {
                return <Icon key={icon.id} iconRef={icon.iconRef} mouse={mouse} onClick={ref => this.handleClick(ref, icon)} iconProps={icon} />;
              })
            }
            <Trash iconRef={this.state.trash.iconRef} mouse={mouse} onClick={ref => this.handleClick(ref, this.state.trash)} iconProps={this.state.trash} />
          </React.Fragment>
        )} />
      </div>
    );
  }
}

export default Desktop;