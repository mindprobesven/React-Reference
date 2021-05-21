import React, { useEffect } from 'react';

import ItemList from '../components/ItemList';

const Body = () => {
  useEffect(() => {
    console.log('<Body> Mounted');
  }, []);

  return (
    <div className="body">
      <ItemList />
    </div>
  );
};

export default Body;
