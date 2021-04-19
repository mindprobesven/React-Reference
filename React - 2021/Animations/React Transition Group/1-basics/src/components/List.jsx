/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import { deleteArticle } from '../redux/store';
import ListItem from './ListItem';

const List = ({ articles, deleteArticle }) => {
  function handleRemove(id) {
    deleteArticle(id);
  }

  const items = articles.map((item) => (
    <ListItem key={item.id} item={item} handleRemove={handleRemove} />
  ));

  return (
    <div className="list">
      {items}
    </div>
  );
};

export default connect(
  ({ articlesState: { data: { articles } } }) => ({ articles }),
  { deleteArticle },
)(List);
