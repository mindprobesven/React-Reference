/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React, { useRef } from 'react';

const AnimatedImageView = () => {
  console.log('AnimatedImageView');
  const overlayRef = useRef();

  function handleClick() {
    console.log('Click');
    const overlayContainer = overlayRef.current;
    overlayContainer.classList.toggle('animate');
  }

  return (
    <div className="container">
      <div className="image-view">
        <div className="overlay-container" ref={overlayRef}>
          <div className="nav-icon" onClick={handleClick}>{'>'}</div>
        </div>
        <img className="image" src="https://picsum.photos/1024/640" alt="" />
      </div>
      <div className="info-text">
        <h3>Cool Image</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat orci enim, vel accumsan eros facilisis non. Cras imperdiet erat vel quam dignissim finibus. Praesent iaculis ornare feugiat. Donec turpis dolor, facilisis et ornare ac, sodales et magna. Ut eu mi ligula. Etiam finibus, nibh vitae ultricies iaculis, nulla ligula dictum neque, vel gravida sem lorem eget libero. Vestibulum semper diam ac lectus dapibus, a volutpat elit porta.</p>
      </div>
    </div>
  );
};

export default AnimatedImageView;
