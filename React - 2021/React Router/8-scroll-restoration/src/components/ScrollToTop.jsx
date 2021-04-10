import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  return null;
};

export default ScrollToTop;
