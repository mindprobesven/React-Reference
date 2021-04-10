/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const Gallery = ({ images }) => {
  console.log('Gallery');

  return (
    <div>
      <h3>Gallery No Modal</h3>
      <ul>
        {
          images.map((image) => (
            <li key={image.id}>
              <Link
                to={`/img/${image.id}`}
              >
                {image.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Gallery;
