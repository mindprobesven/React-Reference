/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
// import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Link,
} from 'react-router-dom';

import './styles/base.scss';
import './styles/style.scss';

import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';
import Section from './components/Section';
import Gallery from './components/Gallery';
import List from './components/List';
import RouteWithSubRoutes from './components/RouteWithSubRoutes';

const routes = [
  {
    path: '/',
    exact: true,
    label: 'Home',
    component: Home,
  },
  {
    path: '/cars',
    label: 'Cars',
    component: Section,
    routes: [
      {
        path: '/cars/new',
        label: 'New',
        component: Gallery,
      },
      {
        path: '/cars/top',
        label: 'Top',
        component: List,
      },
    ],
  },
];

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <Router>
        <div>
          <ul>
            {
              routes.map((route, index) => (
                <li key={index}>
                  <Link to={route.path}>{route.label}</Link>
                </li>
              ))
            }
          </ul>
        </div>

        <hr />

        <Switch>
          {
            routes.map((route, index) => (
              <RouteWithSubRoutes
                key={index}
                {...route}
              />
            ))
          }
        </Switch>
      </Router>
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
