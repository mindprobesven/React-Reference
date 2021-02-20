/* eslint-disable react/prop-types */
import React from 'react';

const ArticleList = ({ id, data }) => (
  <div className="articles">
    <h1>{`${id} Articles`}</h1>
    <p>{data}</p>
  </div>
);

export default ArticleList;
