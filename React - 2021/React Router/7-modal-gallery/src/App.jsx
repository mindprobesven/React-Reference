/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
// import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from 'react-router-dom';

import './styles/base.scss';
import './styles/style.scss';

import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';
import Gallery from './components/Gallery';
import GalleryModal from './components/GalleryModal';
import ImageView from './components/ImageView';
import Modal from './components/Modal';

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
        <Modal />
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/gallery-no-modal">
              <Gallery images={images} />
            </Route>
            <Route path="/gallery-with-modal">
              <GalleryModal images={images} />
            </Route>
            <Route path="/img/:id">
              <ImageView images={images} />
            </Route>
          </Switch>
        </div>
      </Router>
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
