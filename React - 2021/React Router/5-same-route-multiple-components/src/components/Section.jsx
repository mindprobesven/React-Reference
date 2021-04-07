/* eslint-disable max-len */
import React from 'react';
import Sidebar from './Sidebar';
import Main from './Main';

const routes = [
  {
    path: '/cars',
    sidebar: () => <div>Cars Menu</div>,
    main: () => <div>Gallery Component</div>,
  },
  {
    path: '/computers',
    sidebar: () => <div>Computers Menu</div>,
    main: () => <div>List Component</div>,
  },
];

const Section = () => (
  <div className="container">
    {/* The same route config (routes) is used in two different components.
    Both will render a <Route> with the same path, but with different components. */}
    <Sidebar routes={routes} />
    <Main routes={routes} />
  </div>
);

export default Section;
