/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';

import './style.scss';
import MovieDescription from './MovieDescription';
import MovieModal from './MovieModal';

class MovieItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    };
  }

  handleMouseEnter = (e) => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
      left: e.target.getBoundingClientRect().x,
      top: e.target.getBoundingClientRect().y,
      width: e.target.getBoundingClientRect().width,
      height: e.target.getBoundingClientRect().height,
    }));
  }

  handleMouseLeave = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const {
      isOpen, left, top, width, height,
    } = this.state;

    const modal = isOpen
      ? (
        <MovieModal>
          <MovieDescription
            left={left}
            top={top}
            width={width}
            height={height}
          />
        </MovieModal>
      )
      : null;

    return (
      <div
        className="movie-item-container"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="headline">MOVIE</div>
        {modal}
      </div>
    );
  }
}

export default MovieItem;
