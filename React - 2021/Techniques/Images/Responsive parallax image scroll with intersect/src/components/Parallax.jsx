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

const initializeParallaxEvent = new Event('initializeParallax');

const Parallax = () => {
  const parallaxRef = useRef();
  const imageRef = useRef();

  const [parallaxState, setParallaxState] = useState({
    aspectRatio: 0,
    windowTop: 0,
    height: 0,
  });

  const [imageState, setImageState] = useState({
    height: 0,
    translateY: 0,
  });

  const [scrollState, setScrollState] = useState({
    isParallaxIntersecting: false,
    realWindowScrollY: 0,
    computedWindowScrollY: 0,
    scrollableTotal: 0,
    scrollableRemain: 0,
    imageScrollSpeed: 0,
    imageOffset: 0,
  });

  const [isIntersecting, setIsIntersecting] = useState(false);

  // ---------------------------------------------------------------------
  //
  // Setup event listeners on mount
  //
  // ---------------------------------------------------------------------
  useEffect(() => {
    console.log('<Parallax> Mounted');

    const parallaxElement = parallaxRef.current;
    // const imageElement = imageRef.current;
    let imageElement;

    let scrollAnimationFrame;

    let height;
    let imageScrollSpeed;
    let imageOffset;

    const isParallaxIntersecting = false;

    const updateAllCoordinates = () => {
      const {
        top: parallaxTop,
        height: parallaxHeight,
      } = parallaxElement.getBoundingClientRect();

      const imageHeight = imageElement.getBoundingClientRect().height;

      const realWindowScrollY = window.scrollY;
      const parallaxWindowTop = parallaxTop + realWindowScrollY;
      const scrollableTotal = imageHeight - parallaxHeight;
      // const computedWindowScrollY = realWindowScrollY - parallaxWindowTop + window.innerHeight;
      const computedWindowScrollY = realWindowScrollY - parallaxWindowTop + (window.innerHeight * 0.5);
      const scrollableRemain = scrollableTotal - (computedWindowScrollY * imageScrollSpeed + imageOffset);

      const computeTranslateYWithBoundaries = () => {
        if (computedWindowScrollY < 0) {
          return 0;
        }

        if (scrollableRemain > 0) {
          return computedWindowScrollY * imageScrollSpeed + imageOffset;
        }
        return Math.floor(scrollableTotal);
      };

      setParallaxState((prevState) => ({
        ...prevState,
        aspectRatio: height,
        windowTop: parallaxWindowTop,
        height: parallaxHeight,
      }));

      setImageState((prevState) => ({
        ...prevState,
        height: imageHeight,
        translateY: computeTranslateYWithBoundaries(),
      }));

      setScrollState((prevState) => ({
        ...prevState,
        isParallaxIntersecting,
        realWindowScrollY,
        computedWindowScrollY,
        scrollableTotal,
        scrollableRemain,
        imageScrollSpeed,
        imageOffset,
      }));
    };

    const configureParallaxContainer = () => {
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
          // imageScrollSpeed = 0.25;
          imageScrollSpeed = 1;
          // imageOffset = 370;
          imageOffset = 0;
        }
      } else {
        // Portrait orientation
        height = Math.floor(aspectRatio / 1.25);
        imageScrollSpeed = 0.25;
        imageOffset = 0;
      }
    };

    const handleInitializeParallax = () => {
      console.log('[ handleInitializeParallax ]');
      window.removeEventListener('initializeParallaxEvent', handleInitializeParallax);
      console.log(imageRef.current);
      imageElement = imageRef.current;
      configureParallaxContainer();
      updateAllCoordinates();
    };

    const handleResize = (entries, observer) => {
      // configureParallaxContainer();
      // updateAllCoordinates();
    };

    const handleIntersect = (entries, observer) => {
      const [{ isIntersecting: isIntersect }] = entries;

      if (isIntersect) {
        observer.unobserve(parallaxElement);
        setIsIntersecting(true);
      }
    };

    const handleScroll = () => {
      // updateAllCoordinates();
    };

    const onScroll = () => {
      scrollAnimationFrame = requestAnimationFrame(handleScroll);
    };

    // ------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------

    window.addEventListener('initializeParallax', handleInitializeParallax);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parallaxElement);

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const intersectObserver = new IntersectionObserver(handleIntersect, options);
    intersectObserver.observe(parallaxElement);

    window.addEventListener('scroll', onScroll);

    return () => {
      console.log('<Parallax> Unmounted');
      window.removeEventListener('initializeParallaxEvent', handleInitializeParallax);

      resizeObserver.unobserve(parallaxElement);
      intersectObserver.unobserve(parallaxElement);

      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(scrollAnimationFrame);
    };
  }, []);

  // ---------------------------------------------------------------------
  //
  // Processes parallax intersect
  //
  // ---------------------------------------------------------------------
  useEffect(() => {
    console.log(`-------------- Intersecting: ${isIntersecting}`);
    if (isIntersecting) {
      window.dispatchEvent(initializeParallaxEvent);
      // isReady.current = true;
    }
  }, [isIntersecting]);

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
      {
        isIntersecting && (
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
        )
      }
    </div>
  );
};

export default Parallax;
