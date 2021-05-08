/* eslint-disable max-len */
/*
----------------------------------------------------------------------------------

When hot-reloading is enabled, this component will preserve its state (count).

----------------------------------------------------------------------------------
*/
import React, { useEffect, useState } from 'react';

const HotReloadComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('<HotReloadComponent> mounted');
  }, []);

  useEffect(() => {
    console.log('<HotReloadComponent> rendered');
  }, [count]);

  const onAdd = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="list">
      <div className="list__item">
        <div className="list__text">
          <p>{`Counter: ${count}`}</p>
        </div>
        <button
          className="button"
          type="button"
          onClick={onAdd}
        >
          Adds +1
        </button>
      </div>
    </div>
  );
};

export default HotReloadComponent;
