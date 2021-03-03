/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';

import './style.scss';

import ModalPortal from './ModalPortal';
import Modal from './Modal';

class ModalParent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  handleClose = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const { isOpen } = this.state;

    const modal = isOpen
      ? (
        <ModalPortal>
          <Modal handleClose={this.handleClose} />
        </ModalPortal>
      ) : null;

    return (
      <div className="modal-parent-container">
        <button type="button" onClick={this.handleOpen}>OPEN MODAL</button>
        {modal}
      </div>
    );
  }
}

export default ModalParent;
