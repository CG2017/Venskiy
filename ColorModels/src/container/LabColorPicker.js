import React, { Component } from 'react';
import Slider from 'material-ui/Slider';

import { labToRgb, rgbToLab } from '../utils/colorConverters';

class LabColorPicker extends Component {
  constructor(props) {
    super(props);
    const labColor = rgbToLab(props.rgbColor.r, props.rgbColor.g, props.rgbColor.b);
    this.state = {
      valueL: labColor.l,
      valueA: labColor.a,
      valueB: labColor.b,
    }
  }

  componentWillReceiveProps(nextProps) {
    const labColor = rgbToLab(nextProps.rgbColor.r, nextProps.rgbColor.g, nextProps.rgbColor.b);
    this.setState({ valueL: labColor.l, valueA: labColor.a, valueB: labColor.b });
  }

  handleChangeInputL(e) {
    const valueL = parseInt(e.target.value);
    this.setState({ valueL: valueL });
    const rgbColor = labToRgb(valueL, this.state.valueA, this.state.valueB);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeInputA(e) {
    const valueA = parseInt(e.target.value);
    this.setState({ valueA: valueA });
    const rgbColor = labToRgb(this.state.valueL, valueA, this.state.valueB);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeInputB(e) {
    const valueB = parseInt(e.target.value);
    this.setState({ valueB: valueB });
    const rgbColor = labToRgb(this.state.valueL, this.state.valueA, valueB);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeL(e, value) {
    const rgbColor = labToRgb(value, this.state.valueA, this.state.valueB);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeA(e, value) {
    const rgbColor = labToRgb(this.state.valueL, value, this.state.valueB);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeB(e, value) {
    const rgbColor = labToRgb(this.state.valueL, this.state.valueA, value);
    this.props.onSetRgbColor(rgbColor);
  }

  render() {
    return (
      <div className="panel">
        <p className="panel-title">L*A*B</p>
        <div className="option-row">
          <input
            className="option-input"
            type="number"
            value={this.state.valueL}
            onChange={this.handleChangeInputL.bind(this)}
          />
          <Slider
            className="slider"
            name="valueL"
            value={this.state.valueL}
            step={1}
            min={0}
            max={100}
            onChange={this.handleChangeL.bind(this)}
          />
        </div>
        <div className="option-row">
          <input
            className="option-input"
            type="number"
            value={this.state.valueA}
            onChange={this.handleChangeInputA.bind(this)}
          />
          <Slider
            className="slider"
            name="valueA"
            value={this.state.valueA}
            step={1}
            min={-128}
            max={128}
            onChange={this.handleChangeA.bind(this)}
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
            min={-128}
            max={128}
            onChange={this.handleChangeB.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default LabColorPicker;
