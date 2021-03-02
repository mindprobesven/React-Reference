/* eslint-disable react/prop-types */
import { Component } from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

const modalContainer = document.getElementById('modal-container');

class MovieModal extends Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    this.state = {};
  }

  componentDidMount() {
    console.log('Modal mounted');
    modalContainer.appendChild(this.el);
  }

  componentWillUnmount() {
    console.log('Modal un-mounted');
    modalContainer.removeChild(this.el);
  }

  render() {
    const { children } = this.props;

    return ReactDOM.createPortal(
      children,
      this.el,
    );
  }
}

export default MovieModal;
