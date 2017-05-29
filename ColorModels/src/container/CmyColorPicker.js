import React, { Component } from 'react';
import Slider from 'material-ui/Slider';

import { cmyToRgb, rgbToCmy } from '../utils/colorConverters';

class CmyColorPicker extends Component {
  constructor(props) {
    super(props);
    const cmyColor = rgbToCmy(props.rgbColor.r, props.rgbColor.g, props.rgbColor.b);
    this.state = {
      valueC: cmyColor.c,
      valueM: cmyColor.m,
      valueY: cmyColor.y,
    }
  }

  componentWillReceiveProps(nextProps) {
    const cmyColor = rgbToCmy(nextProps.rgbColor.r, nextProps.rgbColor.g, nextProps.rgbColor.b);
    this.setState({ valueC: cmyColor.c, valueM: cmyColor.m, valueY: cmyColor.y });
  }

  handleChangeInputC(e) {
    const valueC = parseInt(e.target.value);
    this.setState({ valueC: valueC });
    const rgbColor = cmyToRgb(valueC, this.state.valueM, this.state.valueY);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeInputM(e) {
    const valueM = parseInt(e.target.value);
    this.setState({ valueM: valueM });
    const rgbColor = cmyToRgb(this.state.valueC, valueM, this.state.valueY);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeInputY(e) {
    const valueY = parseInt(e.target.value);
    this.setState({ valueY: valueY });
    const rgbColor = cmyToRgb(this.state.valueC, this.state.valueM, valueY);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeC(e, value) {
    const rgbColor = cmyToRgb(value, this.state.valueM, this.state.valueY);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeM(e, value) {
    const rgbColor = cmyToRgb(this.state.valueC, value, this.state.valueY);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeY(e, value) {
    const rgbColor = cmyToRgb(this.state.valueC, this.state.valueM, value);
    this.props.onSetRgbColor(rgbColor);
  }

  render() {
    return (
      <div className="panel">
        <p className="panel-title">CMY</p>
        <div className="option-row">
          <input
            className="option-input"
            type="number"
            value={this.state.valueC}
            onChange={this.handleChangeInputC.bind(this)}
          />
          <Slider
            className="slider"
            name="valueC"
            value={this.state.valueC}
            step={0.01}
            min={0}
            max={1}
            onChange={this.handleChangeC.bind(this)}
          />
        </div>
        <div className="option-row">
          <input
            className="option-input"
            type="number"
            value={this.state.valueM}
            onChange={this.handleChangeInputM.bind(this)}
          />
          <Slider
            className="slider"
            name="valueM"
            value={this.state.valueM}
            step={0.01}
            min={0}
            max={1}
            onChange={this.handleChangeM.bind(this)}
          />
        </div>
        <div className="option-row">
          <input
            className="option-input"
            type="number"
            value={this.state.valueY}
            onChange={this.handleChangeInputY.bind(this)}
          />
          <Slider
            className="slider"
            name="valueY"
            value={this.state.valueY}
            step={0.01}
            min={0}
            max={1}
            onChange={this.handleChangeY.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default CmyColorPicker;
