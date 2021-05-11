/* eslint-disable react/prop-types */
import React, { useEffect, memo } from 'react';

const Menu = memo(({ selectCategory }) => {
  useEffect(() => {
    console.log('<Menu> mounted');
  }, []);

  useEffect(() => {
    // console.log('<Menu> rendered -------------------------------->');
  });

  return (
    <div className="list__item">
      <button
        className="button"
        type="button"
        onClick={() => selectCategory('posts')}
      >
        Posts (Default)
      </button>
      <button
        className="button"
        type="button"
        onClick={() => selectCategory('todos')}
      >
        Todos
      </button>
      <button
        className="button"
        type="button"
        onClick={() => selectCategory('articles')}
      >
        Articles (Cached)
      </button>
      <button
        className="button"
        type="button"
        onClick={() => selectCategory('nomatch')}
      >
        Computers (404)
      </button>
    </div>
  );
});

export default Menu;
