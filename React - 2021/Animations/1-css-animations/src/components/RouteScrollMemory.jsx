/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const RouteScrollMemory = () => {
  const { pathname, key } = useLocation();

  const [routes, setRoutes] = useState([]);
  // This adds a throttled window scroll event listener and sets the
  // route state (key and scroll Y position) for the current location pathname
  // when a scroll event is detected.
  useEffect(() => {
    console.log('Scroll event listener - Mounted');
    let timerID;

    function handleScroll() {
      if (timerID) return;
      timerID = setTimeout(() => {
        setRoutes((prevRoutes) => {
          console.log(JSON.stringify(prevRoutes));

          const updatedRoute = {
            path: pathname,
            posY: window.pageYOffset,
            key,
          };

          const routeIndex = prevRoutes
            .findIndex((route) => route.path === pathname);

          // Update the route state of an existing route in the routes array
          if (routeIndex >= 0) {
            const updatedRoutes = [...prevRoutes];
            updatedRoutes[routeIndex] = updatedRoute;
            return updatedRoutes;
          }

          // If the route does not exist in the routes array, add it.
          return [...prevRoutes, updatedRoute];
        });

        timerID = undefined;
      }, 250);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      console.log('Scroll event listener - Cleanup');
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, key]);

  // This detects a location pathname change and scrolls the window to the
  // position that is stored for the current location pathname in the routes state.
  // It uses the location key to determine how the user came to this route.
  //
  // Option 1: The user accessed this route via history back or forward. In this case
  // the location key will be the same as in the route state and the window scrolls
  // to the stored position.
  //
  // Option 2: The user accessed this route by clicking on <Link>. This would change the
  // location key for that pathname. Because the new location key does not match the key
  // in the route's state, the window is forced to scroll to the top (0, 0).
  useEffect(() => {
    console.log(`Pathname updated: ${pathname}`);
    console.log(`Pathname key: ${key}`);
    console.log(JSON.stringify(routes));

    const routeIndex = routes
      .findIndex((route) => route.path === pathname && route.key === key);
    console.log(routeIndex);

    if (routeIndex >= 0) {
      // The current location pathname and key has a match in the routes state array.
      // The scroll position is restored.
      window.scrollTo(0, routes[routeIndex].posY);
    } else {
      // No match was found in the routs state array for the current location pathname and key.
      // The page is scrolled to the top.
      window.scrollTo(0, 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // This will detect a page refresh and force scroll the current route to the top.
  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };
  return null;
};

export default RouteScrollMemory;
