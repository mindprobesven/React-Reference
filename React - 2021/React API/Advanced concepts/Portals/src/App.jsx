// import { hot } from 'react-hot-loader/root';
import React from 'react';

import './styles/base.scss';
import MovieList from './components/MovieList';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <MovieList />
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
