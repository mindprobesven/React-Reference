/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

const imageData = {
  src: 'https://picsum.photos/1920/1920',
  width: 1920,
  height: 1920,
};

const Parallax = () => {
  const parallaxRef = useRef();
  const imageRef = useRef();
  const prevScrollY = useRef();
  const [posY, setPosY] = useState();
  const [parallaxHeight, setParallaxHeight] = useState();

  useEffect(() => {
    console.log('<Parallax> Mounted');

    let scrollAnimationFrame;
    let parallaxScrollSpeed;
    const scrollUpOffset = 10;

    const parallaxElement = parallaxRef.current;
    const imageElement = imageRef.current;

    prevScrollY.current = window.pageYOffset;

    const updateParallaxContainerHeight = () => {
      let parallaxContainerHeight;

      const aspectRatio = Math.floor(
        (imageData.height / imageData.width) * 100,
      );

      if (window.innerWidth > window.innerHeight) {
        // Landscape orientation
        // The parallax container height is half the image aspect ratio
        parallaxContainerHeight = Math.floor(aspectRatio / 2);
        parallaxScrollSpeed = 1.25;
      } else {
        // Portrait orientation
        // The parallax container height is slightly smaller than the image aspect ratio
        parallaxContainerHeight = Math.floor(aspectRatio / 1.5);
        parallaxScrollSpeed = 0.5;
      }

      setParallaxHeight(parallaxContainerHeight);

      const {
        top: parallaxTop,
        bottom: parallaxBottom,
        // height: parallaxHeight,
      } = parallaxElement.getBoundingClientRect();
      const {
        top: imageTop,
        bottom: imageBottom,
        height: imageHeight,
      } = imageElement.getBoundingClientRect();

      const differenceBottom = imageBottom - parallaxBottom;

      if (differenceBottom < scrollUpOffset) {
        // console.log('Misaligned');
        // console.log(parallaxBottom);
        // console.log(imageHeight);
        setPosY(0 - imageHeight + parallaxHeight + scrollUpOffset);
      }
    };

    const scrollHandler = () => {
      const {
        top: parallaxTop,
        bottom: parallaxBottom,
        // height: parallaxHeight,
      } = parallaxElement.getBoundingClientRect();
      const {
        top: imageTop,
        bottom: imageBottom,
        height: imageHeight,
      } = imageElement.getBoundingClientRect();

      const differenceBottom = imageBottom - parallaxBottom;
      const differenceTop = imageTop - parallaxTop;
      // console.log(`D: ${differenceTop}`);
      // console.log(`I: ${0 - imageHeight + parallaxHeight}`);

      // console.log(`P: ${prevScrollY.current}`);
      // console.log(`C: ${window.scrollY}`);

      if (window.scrollY < prevScrollY.current) {
        // console.log('UP');
        if (imageTop < parallaxTop) {
          // console.log(`P: ${parallaxTop}`);
          // console.log(`I: ${imageTop}`);
          setPosY(-window.scrollY * parallaxScrollSpeed);
        }
      } else if (window.scrollY > prevScrollY.current) {
        // console.log('DOWN');
        if (imageBottom > parallaxBottom
          && differenceBottom > scrollUpOffset) {
          // console.log(`P: ${parallaxBottom}`);
          // console.log(`I: ${imageBottom}`);
          setPosY(-window.scrollY * parallaxScrollSpeed);
        }
      }
    };

    const onScroll = () => {
      scrollAnimationFrame = requestAnimationFrame(scrollHandler);
    };

    const handleResize = (entries, observer) => {
      updateParallaxContainerHeight();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parallaxElement);

    window.addEventListener('scroll', onScroll);

    return () => {
      console.log('<Parallax> Unmounted');
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(scrollAnimationFrame);
      resizeObserver.unobserve(parallaxElement);
    };
  }, []);

  useEffect(() => {
    // console.log('<Parallax> rendered');
    prevScrollY.current = window.pageYOffset;
  });

  return (
    <div
      ref={parallaxRef}
      className="parallax"
      style={{ paddingBottom: `${parallaxHeight}%` }}
    >
      {/* <div className="parallax__content-container">
        <h1>PARALLAX</h1>
      </div> */}
      <img
        ref={imageRef}
        className="parallax__image"
        style={{ transform: `translateY(${posY}px)` }}
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
