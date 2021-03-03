/* eslint-disable react/prop-types */
import { Component } from 'react';
import ReactDOM from 'react-dom';

// A div for the modal needs to be present in the index.html
const modalContainer = document.getElementById('modal-container');

class ModalPortal extends Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    this.state = {};
  }

  componentDidMount() {
    // The children will be rendered into this DOM node
    modalContainer.appendChild(this.el);
  }

  componentWillUnmount() {
    modalContainer.removeChild(this.el);
  }

  render() {
    const { children } = this.props;

    // Portals provide a way to render children into a DOM node
    // that exists outside the DOM hierarchy of the parent component.
    return ReactDOM.createPortal(
      children,
      this.el,
    );
  }
}

export default ModalPortal;
