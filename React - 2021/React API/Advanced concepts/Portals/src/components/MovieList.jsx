import React, { Component } from 'react';

import './style.scss';
import MovieItem from './MovieItem';

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="movie-list-container">
        <MovieItem />
        <MovieItem />
      </div>
    );
  }
}

export default MovieList;
