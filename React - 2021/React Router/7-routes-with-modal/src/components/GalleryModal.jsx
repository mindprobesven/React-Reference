/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const GalleryModal = ({ images }) => {
  console.log('Gallery Modal');
  const location = useLocation();

  return (
    <div>
      <h3>Gallery With Modal</h3>
      <ul>
        {
          images.map((image) => (
            <li key={image.id}>
              {/* The /gallery-with-modal 'location' is stored in 'state.background'
                when an image link is clicked in the gallery with modal.
                This makes it possible for the <Switch> to use it as a location and show
                the gallery in the background, behind the modal. */}
              <Link
                to={{
                  pathname: `/img/${image.id}`,
                  state: { background: location },
                }}
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

export default GalleryModal;
