/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

const Counter = ({ articles }) => (
  <div className="counter">
    <h1 className="counter__text">{articles.length}</h1>
  </div>
);

export default connect(
  ({ articlesState: { data: { articles } } }) => ({ articles }),
)(Counter);
