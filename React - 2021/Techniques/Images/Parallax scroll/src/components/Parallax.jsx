/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

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
    top: 0,
    bottom: 0,
    height: 0,
  });

  const [imageState, setImageState] = useState({
    top: 0,
    bottom: 0,
    height: 0,
    translateY: 0,
  });

  const [scrollState, setScrollState] = useState({
    initialScrollPosY: 0,
    currentScrollPosY: 0,
    scrollRemaining: 0,
  });

  const [imagePosY, setImagePosY] = useState(0);

  useEffect(() => {
    console.log('<Parallax> Mounted');

    let scrollAnimationFrame;

    const parallaxElement = parallaxRef.current;
    const imageElement = imageRef.current;

    const updateDimensions = () => {
      const {
        top: parallaxTop,
        bottom: parallaxBottom,
        height: parallaxHeight,
      } = parallaxElement.getBoundingClientRect();

      setParallaxState((prevState) => ({
        ...prevState,
        top: parallaxTop,
        bottom: parallaxBottom,
        height: parallaxHeight,
      }));

      const {
        top: imageTop,
        bottom: imageBottom,
        height: imageHeight,
      } = imageElement.getBoundingClientRect();

      setImageState((prevState) => ({
        ...prevState,
        top: imageTop,
        bottom: imageBottom,
        height: imageHeight,
      }));

      setScrollState((prevState) => ({
        ...prevState,
        scrollRemaining: imageHeight - parallaxHeight - window.scrollY,
      }));
    };

    const configureParallaxContainer = () => {
      let height = 0;

      const aspectRatio = Math.floor(
        (imageData.height / imageData.width) * 100,
      );

      if (window.innerWidth > window.innerHeight) {
        // Landscape orientation
        height = Math.floor(aspectRatio / 2);
      } else {
        // Portrait orientation
        height = Math.floor(aspectRatio / 2);
      }

      setParallaxState((prevState) => ({
        ...prevState,
        aspectRatio: height,
      }));

      updateDimensions();
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

    const handleResize = (entries, observer) => {
      configureParallaxContainer();
    };

    // ---------------------------------------------------------------------

    setScrollState((prevState) => ({
      ...prevState,
      initialScrollPosY: window.scrollY,
      currentScrollPosY: window.scrollY,
    }));

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

  useEffect(() => {
    // console.log('<Parallax> rendered! [ scrollState ]');
    // console.log(scrollState.currentScrollPosY);
    // console.log(scrollState.scrollRemaining);

    /* if (scrollState.scrollRemaining > 0) {
      console.log(parallaxState.height);
      setImageState((prevState) => ({
        ...prevState,
        translateY: scrollState.currentScrollPosY,
      }));
    } */

    setImageState((prevState) => ({
      ...prevState,
      translateY: (scrollState.scrollRemaining > 0)
        ? scrollState.currentScrollPosY
        : imageState.height - parallaxState.height,
    }));
  }, [scrollState]);

  /* useEffect(() => {
    console.log('<Parallax> rendered! [ parallaxState ]');
  }, [parallaxState]); */

  return (
    <div
      ref={parallaxRef}
      className="parallax"
      style={{ paddingBottom: `${parallaxState.aspectRatio}%` }}
    >
      <div className="stats">
        <div className="stats__column">
          <div className="stats__left"><p>[ PARALLAX ]</p></div>
        </div>
        <div className="stats__column">
          <div className="stats__left"><p>Aspect ratio:</p></div>
          <div className="stats__right">
            <p>{`${parallaxState.aspectRatio}%`}</p>
          </div>
        </div>
        <div className="stats__column">
          <div className="stats__left"><p>Top:</p></div>
          <div className="stats__right">
            <p>{`${parallaxState.top}`}</p>
          </div>
        </div>
        <div className="stats__column">
          <div className="stats__left"><p>Bottom:</p></div>
          <div className="stats__right">
            <p>{`${parallaxState.bottom.toFixed(1)}`}</p>
          </div>
        </div>
        <div className="stats__column">
          <div className="stats__left"><p>Height:</p></div>
          <div className="stats__right">
            <p>{`${parallaxState.height.toFixed(1)}`}</p>
          </div>
        </div>
        <div className="stats__column">
          <div className="stats__left"><p>[ IMAGE ]</p></div>
        </div>
        <div className="stats__column">
          <div className="stats__left"><p>Trans Y:</p></div>
          <div className="stats__right">
            <p>{`${imageState.translateY}`}</p>
          </div>
        </div>
        <div className="stats__column">
          <div className="stats__left"><p>Top:</p></div>
          <div className="stats__right">
            <p>{`${imageState.top}`}</p>
          </div>
        </div>
        <div className="stats__column">
          <div className="stats__left"><p>Bottom:</p></div>
          <div className="stats__right">
            <p>{`${imageState.bottom.toFixed(1)}`}</p>
          </div>
        </div>
        <div className="stats__column">
          <div className="stats__left"><p>Height:</p></div>
          <div className="stats__right">
            <p>{`${imageState.height.toFixed(1)}`}</p>
          </div>
        </div>
        <div className="stats__column">
          <div className="stats__left"><p>[ SCROLL ]</p></div>
        </div>
        <div className="stats__column">
          <div className="stats__left"><p>Init Y:</p></div>
          <div className="stats__right">
            <p>{`${scrollState.initialScrollPosY}`}</p>
          </div>
        </div>
        <div className="stats__column">
          <div className="stats__left"><p>Current Y:</p></div>
          <div className="stats__right">
            <p>{`${scrollState.currentScrollPosY}`}</p>
          </div>
        </div>
        <div className="stats__column">
          <div className="stats__left"><p>Remain:</p></div>
          <div className="stats__right">
            <p>{`${scrollState.scrollRemaining}`}</p>
          </div>
        </div>
      </div>
      {/* <div className="parallax__content-container">
        <h1>PARALLAX</h1>
      </div> */}
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
