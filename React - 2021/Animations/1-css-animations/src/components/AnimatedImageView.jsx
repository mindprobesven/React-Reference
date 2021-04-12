/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React, { useRef } from 'react';
import InfoSwiper from './InfoSwiper';

const content = {
  imageUrl: 'https://picsum.photos/1024/640',
  title: 'Cool Image',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat orci enim, vel accumsan eros facilisis non. Cras imperdiet erat vel quam dignissim finibus. Praesent iaculis ornare feugiat. Donec turpis dolor, facilisis et ornare ac, sodales et magna. Ut eu mi ligula. Etiam finibus, nibh vitae ultricies iaculis, nulla ligula dictum neque, vel gravida sem lorem eget libero. Vestibulum semper diam ac lectus dapibus, a volutpat elit porta.',
};

const AnimatedImageView = () => {
  const infoSwiperRef = useRef();

  function handleClick() {
    const overlayContainer = infoSwiperRef.current;
    overlayContainer.classList.toggle('is-open');
  }

  return (
    <div className="image-viewer">
      <div className="image-viewer__image-container">
        <InfoSwiper ref={infoSwiperRef} data={content} handleClick={handleClick} />
        {/* Setting the <img> width and height attributes directly and the css 'image' class
        to width: 100% and height: 100% prevents page reflow */}
        <img className="image-viewer__image" src={content.imageUrl} alt="" width="1024" height="640" />
      </div>
      <div className="image-viewer__text">
        <h3>{content.title}</h3>
        <p>{content.text}</p>
      </div>
    </div>
  );
};

export default AnimatedImageView;
