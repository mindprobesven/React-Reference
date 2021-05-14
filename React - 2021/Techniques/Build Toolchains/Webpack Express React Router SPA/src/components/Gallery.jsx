import React from 'react';
import { useRouteMatch } from 'react-router-dom';

const Gallery = () => {
  const match = useRouteMatch();
  console.log(match);

  return (
    <div className="main">
      <p>Gallery</p>
    </div>
  );
};

export default Gallery;
