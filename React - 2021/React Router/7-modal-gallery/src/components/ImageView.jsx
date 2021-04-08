/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';
import ImageItem from './ImageItem';

const ImageView = ({ images }) => {
  const { id } = useParams();
  const image = images[parseInt(id, 10)];

  return (
    <div>
      <h1>{image.title}</h1>
      <ImageItem color={image.color} />
    </div>
  );
};

export default ImageView;
