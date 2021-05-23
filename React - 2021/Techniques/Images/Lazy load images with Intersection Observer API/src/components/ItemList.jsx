/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import getFakeCategoryData from '../utils/getFakeCategoryData';

import Item from './Item';

const ItemList = () => {
  const [categoryData, setCategoryData] = useState();

  useEffect(() => {
    console.log('<ItemList> Mounted');

    const { electronics } = getFakeCategoryData();
    setCategoryData(electronics);
  }, []);

  return (
    <div className="items">
      {
        categoryData && categoryData.allIDs.map((id) => (
          <Item
            key={id}
            data={categoryData.byIDs[id]}
          />
        ))
      }
    </div>
  );
};

export default ItemList;
