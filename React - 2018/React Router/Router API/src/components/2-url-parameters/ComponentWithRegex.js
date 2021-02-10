import React, { Component} from 'react';

const ComponentWithRegex = ({match}) => (
  <div>
    <h3>{match.params.direction}</h3>
  </div>
);

export default ComponentWithRegex;