import React, { useEffect } from 'react';
import getFakeCategoryData from '../utils/getFakeCategoryData';

import Item from './Item';

const ItemList = () => {
  useEffect(() => {
    console.log('<ItemList> Mounted');
  }, []);

  const { electronics } = getFakeCategoryData();

  return (
    <div className="items">
      {
        electronics.allIDs.map((id) => (
          <Item
            key={id}
            data={electronics.byIDs[id]}
          />
        ))
      }
    </div>
  );
};

export default ItemList;
