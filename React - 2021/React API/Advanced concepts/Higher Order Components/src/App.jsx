/* eslint-disable max-len */
// import { hot } from 'react-hot-loader/root';
import React from 'react';
import './style.css';

import CounterWithDataSource from './BasicHOC/CounterWithDataSource';
import ArticleListWithDataSource from './HOCWithArgs/ArticleListWithDataSource';

const App = () => (
  <div className="app">
    <CounterWithDataSource />
    <ArticleListWithDataSource id="dog" />
    <ArticleListWithDataSource id="cat" />
  </div>
);

// export default hot(App);
export default App;
