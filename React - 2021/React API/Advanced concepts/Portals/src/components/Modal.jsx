/* eslint-disable react/prop-types */
import React from 'react';

const Modal = ({ handleClose }) => (
  <div className="modal-container">
    <div className="modal-content-container">
      <button type="button" onClick={handleClose}>CLOSE MODAL</button>
    </div>
  </div>
);

export default Modal;
