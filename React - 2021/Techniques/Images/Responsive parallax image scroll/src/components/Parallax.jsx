/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import Stats from './Stats';

const imageData = {
  src: 'https://picsum.photos/id/1026/1920/1920',
  width: 1920,
  height: 1920,
};

const Parallax = () => {
  const parallaxRef = useRef();
  const imageRef = useRef();

  const [parallaxState, setParallaxState] = useState({
    aspectRatio: 0,
    height: 0,
  });

  const [imageState, setImageState] = useState({
    height: 0,
    translateY: 0,
  });

  const [scrollState, setScrollState] = useState({
    currentScrollPosY: 0,
    scrollRemaining: 0,
    scrollLimit: 0,
    imageScrollSpeed: 0,
    imageOffset: 0,
  });

  const [imagePosY, setImagePosY] = useState(0);

  // ---------------------------------------------------------------------
  //
  // Setup event listeners on mount
  //
  // ---------------------------------------------------------------------
  useEffect(() => {
    console.log('<Parallax> Mounted');

    const parallaxElement = parallaxRef.current;
    const imageElement = imageRef.current;

    let scrollAnimationFrame;
    let imageScrollSpeed;
    let imageOffset;

    const updateDimensions = () => {
      const parallaxHeight = parallaxElement.getBoundingClientRect().height;
      const imageHeight = imageElement.getBoundingClientRect().height;

      setParallaxState((prevState) => ({
        ...prevState,
        height: parallaxHeight,
      }));

      setImageState((prevState) => ({
        ...prevState,
        height: imageHeight,
      }));

      setScrollState((prevState) => ({
        ...prevState,
        scrollRemaining: imageHeight - parallaxHeight - (window.scrollY * imageScrollSpeed + imageOffset),
        scrollLimit: imageHeight - parallaxHeight,
        imageScrollSpeed,
        imageOffset,
      }));
    };

    const configureParallaxContainer = () => {
      let height;

      const aspectRatio = Math.floor(
        (imageData.height / imageData.width) * 100,
      );

      if (window.innerWidth > window.innerHeight) {
        // Landscape orientation
        if (window.innerWidth >= 1300 && window.innerWidth < 1600) {
          height = Math.floor(aspectRatio / 3.5);
          imageScrollSpeed = 0.25;
          imageOffset = 460;
        } else if (window.innerWidth >= 1600) {
          height = Math.floor(aspectRatio / 4);
          imageScrollSpeed = 0.35;
          imageOffset = 600;
        } else {
          height = Math.floor(aspectRatio / 2.5);
          imageScrollSpeed = 0.25;
          imageOffset = 370;
        }
      } else {
        // Portrait orientation
        height = Math.floor(aspectRatio / 1.25);
        imageScrollSpeed = 0.25;
        imageOffset = 0;
      }

      setParallaxState((prevState) => ({
        ...prevState,
        aspectRatio: height,
      }));

      updateDimensions();
    };

    const handleResize = (entries, observer) => {
      configureParallaxContainer();
    };

    const scrollHandler = () => {
      setScrollState((prevState) => ({
        ...prevState,
        currentScrollPosY: window.scrollY,
      }));

      updateDimensions();
    };

    const onScroll = () => {
      scrollAnimationFrame = requestAnimationFrame(scrollHandler);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parallaxElement);

    window.addEventListener('scroll', onScroll);

    return () => {
      console.log('<Parallax> Unmounted');
      resizeObserver.unobserve(parallaxElement);

      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(scrollAnimationFrame);
    };
  }, []);

  // ---------------------------------------------------------------------
  //
  // Processes on scroll state change
  //
  // ---------------------------------------------------------------------
  useEffect(() => {
    // console.log('<Parallax> rendered! [ scrollState ]');

    setImageState((prevState) => ({
      ...prevState,
      translateY: (scrollState.scrollRemaining > 0)
        ? scrollState.currentScrollPosY * scrollState.imageScrollSpeed + scrollState.imageOffset
        : Math.floor(scrollState.scrollLimit),
    }));
  }, [scrollState]);

  return (
    <div
      ref={parallaxRef}
      className="parallax"
      style={{ paddingBottom: `${parallaxState.aspectRatio}%` }}
    >
      <div className="parallax__content-container">
        <div className="parallax__headline">
          <h1>PARALLAX</h1>
        </div>
      </div>
      <Stats
        parallaxState={parallaxState}
        imageState={imageState}
        scrollState={scrollState}
      />
      <img
        ref={imageRef}
        className="parallax__image"
        style={{ transform: `translateY(${-imageState.translateY}px)` }}
        src={imageData.src}
        width={imageData.width}
        height={imageData.height}
        alt=""
        onLoad={() => console.log('Image loaded')}
      />
    </div>
  );
};

export default Parallax;
