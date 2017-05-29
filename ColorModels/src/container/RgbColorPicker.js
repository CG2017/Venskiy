import React, { Component } from 'react';
import Slider from 'material-ui/Slider';

import { rgbToHex, hexToRgb } from '../utils/colorConverters';

class RgbColorPicker extends Component {
  constructor(props) {
    super(props);
    const rgbColor = hexToRgb(props.hexColor);
    this.state = {
      valueR: rgbColor.r,
      valueG: rgbColor.g,
      valueB: rgbColor.b,
    }
  }

  componentWillReceiveProps(nextProps) {
    const rgbColor = hexToRgb(nextProps.hexColor);
    this.setState({ valueR: rgbColor.r, valueG: rgbColor.g, valueB: rgbColor.b});
  }

  handleChangeInputR(e) {
    const valueR = parseInt(e.target.value);
    this.setState({ valueR: valueR });
    if (e.target.value && valueR >= 0 && valueR <= 255) {
      const hexColor = rgbToHex(valueR, this.state.valueG, this.state.valueB);
      this.props.onSetHexColor(hexColor);
    }
  }

  handleChangeInputG(e) {
    const valueG = parseInt(e.target.value);
    this.setState({ valueG: valueG });
    if (e.target.value && valueG >= 0 && valueG <= 255) {
      const hexColor = rgbToHex(this.state.valueR, valueG, this.state.valueB);
      this.props.onSetHexColor(hexColor);
    }
  }

  handleChangeInputB(e) {
    const valueB = parseInt(e.target.value);
    this.setState({ valueB: valueB });
    if (e.target.value && valueB >= 0 && valueB <= 255) {
      const hexColor = rgbToHex(this.state.valueR, this.state.valueG, valueB);
      this.props.onSetHexColor(hexColor);
    }
  }

  handleChangeR(e, value) {
    const hexColor = rgbToHex(value, this.state.valueG, this.state.valueB);
    this.props.onSetHexColor(hexColor);
  }

  handleChangeG(e, value) {
    const hexColor = rgbToHex(this.state.valueR, value, this.state.valueB);
    this.props.onSetHexColor(hexColor);
  }

  handleChangeB(e, value) {
    const hexColor = rgbToHex(this.state.valueR, this.state.valueG, value);
    this.props.onSetHexColor(hexColor);
  }

  render() {
    return (
      <div className="panel">
        <p className="panel-title">RGB</p>
        <div className="option-row">
          <input
            className="option-input"
            type="number"
            value={this.state.valueR}
            onChange={this.handleChangeInputR.bind(this)}
          />
          <Slider
            className="slider"
            name="valueR"
            value={this.state.valueR}
            step={1}
            min={0}
            max={255}
            onChange={this.handleChangeR.bind(this)}
          />
        </div>
        <div className="option-row">
          <input
            className="option-input"
            type="number"
            value={this.state.valueG}
            onChange={this.handleChangeInputG.bind(this)}
          />
          <Slider
            className="slider"
            name="valueG"
            value={this.state.valueG}
            step={1}
            min={0}
            max={255}
            onChange={this.handleChangeG.bind(this)}
          />
        </div>
        <div className="option-row">
          <input
            className="option-input"
            type="number"
            value={this.state.valueB}
            onChange={this.handleChangeInputB.bind(this)}
          />
          <Slider
            className="slider"
            name="valueB"
            value={this.state.valueB}
            step={1}
            min={0}
            max={255}
            onChange={this.handleChangeB.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default RgbColorPicker;
