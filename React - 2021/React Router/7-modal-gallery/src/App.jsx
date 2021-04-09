/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
// import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';

import './styles/base.scss';
import './styles/style.scss';

import ErrorBoundary from './components/ErrorBoundary';
import SwitchController from './components/SwitchController';

const images = [
  { id: 0, title: 'Dark Orchid', color: 'DarkOrchid' },
  { id: 1, title: 'Lime Green', color: 'LimeGreen' },
  { id: 2, title: 'Tomato', color: 'Tomato' },
  { id: 3, title: 'Seven Ate Nine', color: '#789' },
  { id: 4, title: 'Crimson', color: 'Crimson' },
];

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/gallery-no-modal">Gallery no modal</Link>
            </li>
            <li>
              <Link to="/gallery-with-modal">Gallery with modal</Link>
            </li>
          </ul>
        </div>

        <hr />
        {/* <Switch> needs to be in a custom wrapper component, here <SwitchController>
        to be able to access 'location' via useLocation(). The <SwitchController> will
        be able to access 'location' via useLocation() because it is a child of <Router> */}
        <SwitchController images={images} />
      </Router>
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
