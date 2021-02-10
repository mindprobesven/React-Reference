import React, { Component } from 'react';
import './ContainerWithPortal.scss';

import Modal from './Modal';

class ContainerWithPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  showModal = () => {
    this.setState({showModal: true});
  }

  hideModal = () => {
    this.setState({showModal: false});
  }
  
  render() {
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <button onClick={this.hideModal}>Hide Modal</button>
        </div>
      </Modal>
    ) : null;

    return (
      <div className="container-with-portal">
        <button onClick={this.showModal}>Show Modal</button>
        {modal}
      </div>
    );
  }
}

export default ContainerWithPortal;