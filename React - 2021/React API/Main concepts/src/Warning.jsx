import React, { Component } from 'react';
import PropTypes from 'prop-types';

const WarningBanner = ({ status }) => {
  if (!status) {
    return null;
  }

  return (
    <h1>Warning!!! Nukes have launched</h1>
  );
};

const WarningBanner2 = () => (
  <h1>Warning!!! Nukes have launched</h1>
);

const WarningButton = ({ onClick, status }) => (
  <button type="button" onClick={onClick}>
    {status ? 'Hide Warning' : 'Show Warning'}
  </button>
);

class Warning extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showWarning: false,
    };
  }

  handleClick = () => {
    this.setState((state) => ({
      showWarning: !state.showWarning,
    }));
  }

  render() {
    const { showWarning } = this.state;

    return (
      <div>
        <WarningButton onClick={this.handleClick} status={showWarning} />
        <WarningBanner status={showWarning} />
        {showWarning ? <WarningBanner2 /> : null}
      </div>
    );
  }
}

WarningButton.propTypes = {
  onClick: PropTypes.shape(PropTypes.object).isRequired,
  status: PropTypes.bool.isRequired,
};

WarningBanner.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default Warning;
