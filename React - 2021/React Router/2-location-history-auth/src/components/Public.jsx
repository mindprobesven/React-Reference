import React from 'react';
import { useRouteMatch } from 'react-router-dom';

const Public = () => {
  const match = useRouteMatch();

  console.log(match);

  return (
    <div>
      <h1>Public</h1>
    </div>
  );
};

export default Public;
