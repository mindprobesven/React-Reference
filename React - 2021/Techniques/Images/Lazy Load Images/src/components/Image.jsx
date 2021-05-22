/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

const Image = ({ images }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('<Image> Mounted');
  }, []);

  const onImageLoaded = () => {
    console.log('Image loaded!');
    setIsLoaded(true);
  };

  return (
    <>
      <img
        className="items__image items__image--thumb"
        style={{ visibility: isLoaded ? 'hidden' : 'visible' }}
        src={images.thumb}
        alt=""
      />
      <img
        className="items__image items__image--full"
        style={{ opacity: isLoaded ? 1 : 0 }}
        src={images.full}
        alt=""
        onLoad={onImageLoaded}
      />
    </>
  );
};

export default Image;
