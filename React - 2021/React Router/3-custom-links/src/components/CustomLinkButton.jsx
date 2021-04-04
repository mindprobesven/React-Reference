/* eslint-disable react/prop-types */
import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

const CustomLinkButton = ({ to, label }) => {
  const history = useHistory();

  // The useRouteMatch hook attempts to match the current URL in the same way
  // that a <Route> would. It’s mostly useful for getting access to the match
  // data without actually rendering a <Route>.
  //
  // We pass an object to useRouteMatch() to check if the current route path = to and if exact = true.
  // If there is a route match, a match object is returned, otherwise null.
  const match = useRouteMatch({
    path: to,
    exact: true,
  });

  function handleClick() {
    history.push(to);
  }

  return (
    <div
      className={`custom-link ${match && 'custom-link-activated'}`}
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex="0"
    >
      {label}
    </div>
  );
};

export default CustomLinkButton;
