/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

const useIntersectionObserver = (target) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = target.current;

    const onHandleIntersect = (entries, observer) => {
      // Each entry describes an intersection change for one observed target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time

      const [{ isIntersecting }] = entries;

      if (isIntersecting) {
        setIsVisible(true);
        observer.unobserve(target.current);
      }
    };

    const options = {
      // The element that is used as the viewport for checking visibility of the target.
      // Must be the ancestor of the target. Defaults to the browser viewport if not
      // specified or if null.
      root: null,
      // Margin around the root. Can have values similar to the CSS margin property, e.g.
      // "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages.
      // This set of values serves to grow or shrink each side of the root element's bounding
      // box before computing intersections. Defaults to all zeros.
      rootMargin: '0px',
      // Either a single number or an array of numbers which indicate at what percentage of
      // the target's visibility the observer's callback should be executed.
      threshold: 0.1,
    };

    // Intersection Observer API
    // ----------------------------------------------------------------------------------------
    // The Intersection Observer API provides a way to asynchronously observe changes in the
    // intersection of a target element with an ancestor element or with a top-level document's
    // viewport.
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const observer = new IntersectionObserver(onHandleIntersect, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return [isVisible];
};

export default useIntersectionObserver;
