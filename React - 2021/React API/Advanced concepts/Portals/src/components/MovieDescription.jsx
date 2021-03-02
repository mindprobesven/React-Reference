/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import './style.scss';

class MovieDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      left, top, width, height,
    } = this.props;

    const position = {
      left: left - (width * 0.1),
      top: top - (width * 0.1),
      width: width + ((width * 0.1) * 2),
      height: height + ((width * 0.1) * 2),
    };

    return (
      <div className="movie-description-container" style={position}>
        <div className="headline">INFO</div>
      </div>
    );
  }
}

export default MovieDescription;
