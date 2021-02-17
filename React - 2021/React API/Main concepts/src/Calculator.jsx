/* eslint-disable max-classes-per-file */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TemperatureInput extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  handleChange = (e) => {
    const { onTemperatureChange, scale } = this.props;

    onTemperatureChange(e.target.value, scale);
  }

  render() {
    const { temperature, scale } = this.props;

    return (
      <>
        <legend>
          Enter temperature in
          {scale === 'c' ? ' Celsious' : ' Fahrenheit'}
          :
        </legend>
        <input type="text" value={temperature} onChange={this.handleChange} />
      </>
    );
  }
}

const BoilValidation = ({ value }) => (
  <p>
    {parseFloat(value) >= 100
      ? 'Water is boiling!'
      : 'Water is NOT boiling!'}
  </p>
);

const convertTemperature = (temperature, scale) => {
  const input = parseFloat(temperature);

  if (Number.isNaN(input)) return '';

  let output;

  if (scale === 'c') {
    output = input * 2;
  } else if (scale === 'f') {
    output = input / 2;
  }

  const rounded = Math.round(output * 1000) / 1000;

  return rounded.toString();
};

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      scale: 'c',
    };
  }

  handleTemperatureChange = (temperature, scale) => {
    this.setState({ temperature, scale });
  }

  render() {
    const { temperature, scale } = this.state;

    const celsius = scale === 'f'
      ? convertTemperature(temperature, scale)
      : temperature;

    const fahrenheit = scale === 'c'
      ? convertTemperature(temperature, scale)
      : temperature;

    return (
      <div>
        <fieldset>
          <TemperatureInput
            temperature={celsius}
            scale="c"
            onTemperatureChange={this.handleTemperatureChange}
          />
        </fieldset>
        <br />
        <fieldset>
          <TemperatureInput
            temperature={fahrenheit}
            scale="f"
            onTemperatureChange={this.handleTemperatureChange}
          />
        </fieldset>
        <BoilValidation value={celsius} />
      </div>
    );
  }
}

BoilValidation.propTypes = {
  value: PropTypes.string.isRequired,
};

TemperatureInput.propTypes = {
  temperature: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired,
  onTemperatureChange: PropTypes.func.isRequired,
};

export default Calculator;
