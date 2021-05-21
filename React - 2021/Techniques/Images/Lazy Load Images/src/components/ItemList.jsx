/* eslint-disable max-len */
import React, { useEffect } from 'react';

import Item from './Item';

const ItemList = () => {
  useEffect(() => {
    console.log('<ItemList> Mounted');
  }, []);

  return (
    <div className="items">
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default ItemList;
