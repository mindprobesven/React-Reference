/* eslint-disable react/prop-types */
import React from 'react';

const ListItem = ({ item, handleRemove }) => {
  console.log('ListItem');

  return (
    <div className="list__item">
      <div className="list__text">
        <p>{item.title}</p>
      </div>
      <button
        className="button"
        type="button"
        onClick={() => handleRemove(item.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default ListItem;
