/* eslint-disable react/prop-types */
/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import Image from './Image';
import Content from './Content';
import Stats from './Stats';

const initializeImageEvent = new Event('initializeImage');
const initializeParallaxEvent = new Event('initializeParallax');

const Parallax = ({ data }) => {
  const parallaxRef = useRef();
  const imageRef = useRef();

  const [parallaxState, setParallaxState] = useState({
    aspectRatio: 0,
    windowTop: 0,
    height: 0,
    viewportBot: 0,
    contentScrollPercent: 0,
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
    imageScrollSpeed: 0,
    imageOffset: 0,
  });

  const [isParallaxIntersecting, setIsParallaxIntersecting] = useState(false);
  const [isImageInitialized, setIsImageInitialized] = useState(false);

  // ---------------------------------------------------------------------
  //
  // Component mounted
  //
  // ---------------------------------------------------------------------
  useLayoutEffect(() => {
    console.log(`<Parallax> [ ${data.id} ] Mounted`);

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
      const viewportStartScrollPos = (data.options.viewportStartScrollPos > 0)
        ? viewportHeight * data.options.viewportStartScrollPos
        : 0;
      const computedWindowScrollY = realWindowScrollY - parallaxWindowTop + viewportStartScrollPos;
      const scrollableRemain = scrollableTotal - (computedWindowScrollY * imageScrollSpeed + imageOffset);
      const parallaxViewportBottom = (realWindowScrollY + viewportHeight) - parallaxWindowBottom;

      // 0% = The parallax container is fully visible above the viewport bottom
      // 100% = The parallax container is visible and has scrolled up 100% of its height
      const computeContentScrollPercent = () => {
        const { scrollSpeed } = data.content;

        const parallaxContentScrollPercent = (scrollSpeed > 0)
          ? ((parallaxViewportBottom / parallaxHeight) * 100) * scrollSpeed
          : ((parallaxViewportBottom / parallaxHeight) * 100);

        return Math.round(parallaxContentScrollPercent * 100) / 100;
      };

      const computeTranslateYWithBoundaries = () => {
        if (computedWindowScrollY < 0 && imageOffset === 0) {
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
        contentScrollPercent: computeContentScrollPercent(),
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
        imageScrollSpeed,
        imageOffset,
      }));
    };

    const configureParallaxContainer = () => {
      const {
        landscape,
        portrait,
      } = data.options;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const aspectRatio = Math.floor(
        (data.images.height / data.images.width) * 100,
      );

      // The options passed as props to the parallax component are validated and if necessary
      // modified to avoid computational errors.
      const validateHeightImageRatioOption = (heightImageRatioOption) => (
        (heightImageRatioOption > 0)
          ? Math.floor(aspectRatio * heightImageRatioOption)
          : Math.floor(aspectRatio)
      );

      const validateImageScrollSpeedOption = (imageScrollSpeedOption) => (
        (imageScrollSpeedOption > 0)
          ? imageScrollSpeedOption
          : 0.00001
      );

      const validateImageOffsetOption = (imageOffsetOption) => (
        (imageOffsetOption > 0)
          ? imageOffsetOption
          : 0
      );

      if (viewportWidth > viewportHeight) {
        // Landscape orientation
        if (viewportWidth < 1300) {
          imageAspectRatio = validateHeightImageRatioOption(landscape.small.heightImageRatio);
          imageScrollSpeed = validateImageScrollSpeedOption(landscape.small.imageScrollSpeed);
          imageOffset = validateImageOffsetOption(landscape.small.imageOffset);
        } else if (viewportWidth >= 1300 && viewportWidth < 1600) {
          imageAspectRatio = validateHeightImageRatioOption(landscape.medium.heightImageRatio);
          imageScrollSpeed = validateImageScrollSpeedOption(landscape.medium.imageScrollSpeed);
          imageOffset = validateImageOffsetOption(landscape.medium.imageOffset);
        } else if (viewportWidth >= 1600) {
          imageAspectRatio = validateHeightImageRatioOption(landscape.large.heightImageRatio);
          imageScrollSpeed = validateImageScrollSpeedOption(landscape.large.imageScrollSpeed);
          imageOffset = validateImageOffsetOption(landscape.large.imageOffset);
        }
      } else {
        // Portrait orientation
        imageAspectRatio = validateHeightImageRatioOption(portrait.heightImageRatio);
        imageScrollSpeed = validateImageScrollSpeedOption(portrait.imageScrollSpeed);
        imageOffset = validateImageOffsetOption(portrait.imageOffset);
      }
    };

    // When Parallax intersection occurs, the isParallaxIntersecting state is updated.
    // This causes a re-render, which adds the Parallax's children components (<Image> and <Content>).
    const handleParallaxIntersect = (entries, observer) => {
      const [{ isIntersecting }] = entries;

      if (isIntersecting) {
        observer.unobserve(parallaxElement);
        setIsParallaxIntersecting(true);
      }
    };

    // We store the "ref" of the now rendered image in imageElement. We need the "ref" to configure
    // the parallax container dimensions and to update all coordinates.
    // To get the newly computed dimensions of the parallax container, we need to force a re-render by
    // updating the setIsImageInitialized state.
    const handleInitializeImage = () => {
      console.log(`[ handleInitializeImage ] - [ ${data.id} ]`);
      parallaxElement.removeEventListener('initializeImage', handleInitializeImage);

      imageElement = imageRef.current;

      configureParallaxContainer();
      updateAllCoordinates();

      setIsImageInitialized(true);
    };

    // At this point, the parallax container rendered its children and has obtained computed dimensions.
    // Now we can update all coordinates one last time.
    const handleInitializeParallax = () => {
      console.log('[ handleInitializeParallax ]');
      parallaxElement.removeEventListener('initializeParallax', handleInitializeParallax);

      configureParallaxContainer();
      updateAllCoordinates();
    };

    // Resizing the parallax container will update its configuration and all coordinates for full
    // responsiveness. Updates are triggered only when the parallax container intersected and its
    // <Image> child component was rendered.
    const handleResize = (entries, observer) => {
      if (typeof imageElement !== 'undefined') {
        configureParallaxContainer();
        updateAllCoordinates();
      }
    };

    // Scrolling updates all coordinates. Updates are triggered only when the parallax container
    // intersected and its <Image> child component was rendered.
    const handleScroll = () => {
      if (typeof imageElement !== 'undefined') {
        updateAllCoordinates();
      }
    };

    const onScroll = () => {
      scrollAnimationFrame = requestAnimationFrame(handleScroll);
    };

    // ---------------------------------------------------------------------
    //
    // Mount - Create event listeners and observers
    //
    // ---------------------------------------------------------------------

    // An intersection observer is created for the Parallax div container.
    // The Parallax's children components (<Image> and <Content>) are not
    // rendered until intersection is observed.
    const intersectObserver = new IntersectionObserver(handleParallaxIntersect, {
      root: null,
      // Detect intersection an amount of pixels above the parallax div
      rootMargin: (data.options.intersectAbove > 0) ? `${data.options.intersectAbove}px` : '0px',
      threshold: 0,
    });
    intersectObserver.observe(parallaxElement);

    parallaxElement.addEventListener('initializeImage', handleInitializeImage);
    parallaxElement.addEventListener('initializeParallax', handleInitializeParallax);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parallaxElement);

    window.addEventListener('scroll', onScroll);

    // ---------------------------------------------------------------------
    //
    // Unmount - Remove event listeners and observers
    //
    // ---------------------------------------------------------------------

    return () => {
      console.log(`<Parallax> [ ${data.id} ] Unmounted`);
      intersectObserver.unobserve(parallaxElement);

      parallaxElement.removeEventListener('initializeImage', handleInitializeImage);
      parallaxElement.removeEventListener('initializeParallax', handleInitializeParallax);

      resizeObserver.unobserve(parallaxElement);

      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(scrollAnimationFrame);
    };
  }, []);

  // ---------------------------------------------------------------------
  //
  // Component updated - useEffects
  //
  // ---------------------------------------------------------------------

  // At this point, the Parallax children component <Image> is rendered. We now
  // need a "ref" to the image, so we dispatch the initializeImageEvent which handles this.
  useLayoutEffect(() => {
    console.log(`<Parallax> [ ${data.id} ] Updated [isParallaxIntersecting]: ${isParallaxIntersecting}`);
    if (isParallaxIntersecting) {
      const parallaxElement = parallaxRef.current;
      parallaxElement.dispatchEvent(initializeImageEvent);
    }
  }, [isParallaxIntersecting]);

  // The parallax container has now rendered with its computed dimensions and we dispatch
  // initializeParallaxEvent to update all coordinates.
  useLayoutEffect(() => {
    console.log(`<Parallax> [ ${data.id} ] Updated [isImageInitialized]: ${isImageInitialized}`);
    if (isImageInitialized) {
      const parallaxElement = parallaxRef.current;
      parallaxElement.dispatchEvent(initializeParallaxEvent);
    }
  }, [isImageInitialized]);

  return (
    <div
      ref={parallaxRef}
      className="parallax"
      style={{ paddingBottom: `${parallaxState.aspectRatio}%` }}
    >
      {
        data.options.showStats && (
          <Stats
            parallaxState={parallaxState}
            imageState={imageState}
            scrollState={scrollState}
          />
        )
      }
      {
        isParallaxIntersecting && (
          <>
            <Image
              ref={imageRef}
              data={data.images}
              translateY={imageState.translateY}
            />
            <Content
              data={data.content}
              contentScrollPercent={parallaxState.contentScrollPercent}
            />
          </>
        )
      }
    </div>
  );
};

export default Parallax;
