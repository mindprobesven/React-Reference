import React, { Component } from "react";

function BoilingVerdict(props) {
  if(props.celcius >= 100) {
    return <h3>The water is boiling!</h3>
  }
  else {
    return <h3>The water is not hot enough!</h3>
  }
}

const scaleName = {
  c: 'Celcius',
  f: 'Fahrenheit'
}

class TemperatureInput extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render () {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    
    return (
      <fieldset>
        <legend>Enter temperature in {scaleName[scale]}:</legend>
        <input type="text" value={temperature} onChange={(e) => this.handleChange(e)}/>
      </fieldset>
    );
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state ={
      temperature: '',
      scale: 'c'
    }
  }

  handleCelciusChange(temperature) {
    this.setState({ temperature, scale: 'c' });
  }
  
  handleFahrenheitChange(temperature) {
    this.setState({ temperature, scale: 'f' });
  }

  render () {
    const temperature = this.state.temperature;
    const scale = this.state.scale;

    const celcius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    
    return (
      <div>
        <TemperatureInput scale="c" temperature={celcius} onTemperatureChange={(temperature) => this.handleCelciusChange(temperature)} />
        <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={(temperature) => this.handleFahrenheitChange(temperature)} />
        <hr />
        <br />
        <BoilingVerdict celcius={parseFloat(celcius)} />
        <br />
        <hr />
        <br />
      </div>
    );
  }
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

export default Calculator;