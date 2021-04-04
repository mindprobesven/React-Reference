import React from 'react';
import { useRouteMatch } from 'react-router-dom';

const Protected = () => {
  const match = useRouteMatch();

  console.log(match);

  return (
    <div>
      <h1>Protected</h1>
    </div>
  );
};

export default Protected;
