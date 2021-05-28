/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const Image = React.forwardRef(({ data, translateY }, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <img
        ref={ref}
        className="parallax__image parallax__image--thumb"
        style={{
          transform: `translateY(${-translateY}px)`,
          visibility: isLoaded ? 'hidden' : 'visible',
        }}
        src={data.images.thumb}
        width={data.width}
        height={data.height}
        alt=""
      />
      <img
        className="parallax__image parallax__image--full"
        style={{
          transform: `translateY(${-translateY}px)`,
          opacity: isLoaded ? 1 : 0,
        }}
        src={data.images.full}
        width={data.width}
        height={data.height}
        alt=""
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
});

Image.displayName = 'Image';

export default Image;
