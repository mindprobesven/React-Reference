/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const RouteScrollMemory = () => {
  const [routes, setRoutes] = useState([]);
  const { pathname, key } = useLocation();

  useEffect(() => {
    console.log('RouteScrollMemory mounted');
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

          if (routeIndex >= 0) {
            const updatedRoutes = [...prevRoutes];
            updatedRoutes[routeIndex] = updatedRoute;
            return updatedRoutes;
          }

          return [...prevRoutes, updatedRoute];
        });

        timerID = undefined;
      }, 250);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      console.log('RouteScrollMemory will unmount');

      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, key]);

  useEffect(() => {
    console.log(`Pathname updated: ${pathname}`);
    console.log(`Pathname key: ${key}`);
    console.log(JSON.stringify(routes));

    const routeIndex = routes
      .findIndex((route) => route.path === pathname && route.key === key);
    console.log(routeIndex);

    if (routeIndex >= 0) {
      window.scrollTo(0, routes[routeIndex].posY);
    } else {
      window.scrollTo(0, 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
};

export default RouteScrollMemory;
