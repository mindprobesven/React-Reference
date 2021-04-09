/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ImageItem from './ImageItem';

const ModalView = ({ images }) => {
  console.log('ModalView');
  const { id } = useParams();
  const image = images[parseInt(id, 10)];
  console.log(image);

  const history = useHistory();

  function handleClose() {
    // Closing the modal will simply do history go back -1 back to /gallery-with-modal
    history.goBack();
  }

  return (
    <div className="modal-background">
      <div className="modal-container">
        <h3>{image.title}</h3>
        <ImageItem color={image.color} />
        <button type="button" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalView;
