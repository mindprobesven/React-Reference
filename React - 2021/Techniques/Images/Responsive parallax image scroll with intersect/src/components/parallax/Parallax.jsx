/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import Image from './Image';
import Content from './Content';
import Stats from './Stats';

const imageData = {
  images: {
    thumb: 'https://picsum.photos/id/1026/100/100',
    full: 'https://picsum.photos/id/1026/4000/4000',
  },
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
    viewportBot: 0,
  });

  const [imageState, setImageState] = useState({
    height: 0,
    translateY: 0,
  });

  const [scrollState, setScrollState] = useState({
    realWindowScrollY: 0,
    computedWindowScrollY: 0,
    scrollableTotal: 0,
    scrollableRemain: 0,
    scrolledPercent: 0,
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
    let imageElement;

    let scrollAnimationFrame;

    let imageAspectRatio;
    let imageScrollSpeed;
    let imageOffset;

    const updateAllCoordinates = () => {
      const {
        top: parallaxTop,
        height: parallaxHeight,
      } = parallaxElement.getBoundingClientRect();

      const imageHeight = imageElement.getBoundingClientRect().height;

      const realWindowScrollY = window.scrollY;
      const parallaxWindowTop = parallaxTop + realWindowScrollY;
      const parallaxWindowBottom = parallaxWindowTop + parallaxHeight;
      const scrollableTotal = imageHeight - parallaxHeight;
      const viewportHeight = window.innerHeight;
      // The percentage value of the viewport position from the top (1.0 = 100% = bottom of viewport)
      // from which to start the image scroll
      const viewportStartScrollPos = viewportHeight * 1.0;
      const computedWindowScrollY = realWindowScrollY - parallaxWindowTop + viewportStartScrollPos;
      const scrollableRemain = scrollableTotal - (computedWindowScrollY * imageScrollSpeed + imageOffset);
      const scrolledPercent = Math.round((((scrollableTotal - scrollableRemain) / scrollableTotal) * 100) * 100) / 100;
      const parallaxViewportBottom = (realWindowScrollY + viewportHeight) - parallaxWindowBottom;

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
        aspectRatio: imageAspectRatio,
        windowTop: parallaxWindowTop,
        height: parallaxHeight,
        viewportBot: parallaxViewportBottom,
      }));

      setImageState((prevState) => ({
        ...prevState,
        height: imageHeight,
        translateY: computeTranslateYWithBoundaries(),
      }));

      setScrollState((prevState) => ({
        ...prevState,
        realWindowScrollY,
        computedWindowScrollY,
        scrollableTotal,
        scrollableRemain,
        scrolledPercent,
        imageScrollSpeed,
        imageOffset,
      }));
    };

    const configureParallaxContainer = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const aspectRatio = Math.floor(
        (imageData.height / imageData.width) * 100,
      );

      if (viewportWidth > viewportHeight) {
        // Landscape orientation
        if (viewportWidth >= 1300 && viewportWidth < 1600) {
          imageAspectRatio = Math.floor(aspectRatio / 3.5);
          imageScrollSpeed = 0.75;
          imageOffset = 0;
        } else if (viewportWidth >= 1600) {
          imageAspectRatio = Math.floor(aspectRatio / 4);
          imageScrollSpeed = 0.35;
          imageOffset = 600;
        } else {
          imageAspectRatio = Math.floor(aspectRatio / 2.5);
          imageScrollSpeed = 0.75;
          imageOffset = 0;
        }
      } else {
        // Portrait orientation
        imageAspectRatio = Math.floor(aspectRatio / 1.25);
        imageScrollSpeed = 0.1;
        imageOffset = 0;
      }
    };

    const handleIntersect = (entries, observer) => {
      const [{ isIntersecting: isIntersect }] = entries;

      if (isIntersect) {
        observer.unobserve(parallaxElement);
        setIsIntersecting(true);
      }
    };

    const handleInitializeParallax = () => {
      console.log('[ handleInitializeParallax ]');
      window.removeEventListener('initializeParallax', handleInitializeParallax);

      imageElement = imageRef.current;

      configureParallaxContainer();
      updateAllCoordinates();
    };

    const handleResize = (entries, observer) => {
      if (typeof imageElement !== 'undefined') {
        configureParallaxContainer();
        updateAllCoordinates();
      }
    };

    const handleScroll = () => {
      if (typeof imageElement !== 'undefined') {
        updateAllCoordinates();
      }
    };

    const onScroll = () => {
      scrollAnimationFrame = requestAnimationFrame(handleScroll);
    };

    // ------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------

    const options = {
      root: null,
      // Detect the intersection 250 pixel above the parallax container
      rootMargin: '250px',
      threshold: 0,
    };

    const intersectObserver = new IntersectionObserver(handleIntersect, options);
    intersectObserver.observe(parallaxElement);

    window.addEventListener('initializeParallax', handleInitializeParallax);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parallaxElement);

    window.addEventListener('scroll', onScroll);

    return () => {
      console.log('<Parallax> Unmounted');
      intersectObserver.unobserve(parallaxElement);

      window.removeEventListener('initializeParallax', handleInitializeParallax);

      resizeObserver.unobserve(parallaxElement);

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
    console.log(`<Parallax> Updated [isIntersecting]: ${isIntersecting}`);
    if (isIntersecting) {
      window.dispatchEvent(initializeParallaxEvent);
    }
  }, [isIntersecting]);

  return (
    <div
      ref={parallaxRef}
      className="parallax"
      style={{ paddingBottom: `${parallaxState.aspectRatio}%` }}
    >
      <Stats
        parallaxState={parallaxState}
        imageState={imageState}
        scrollState={scrollState}
      />
      {
        isIntersecting && (
          <>
            <Image
              ref={imageRef}
              data={imageData}
              translateY={imageState.translateY}
            />
            <Content scrolled={scrollState.scrolledPercent} />
          </>
        )
      }
    </div>
  );
};

export default Parallax;
