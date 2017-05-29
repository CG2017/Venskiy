import React, { Component } from 'react';
import Slider from 'material-ui/Slider';

import { hsvToRgb, rgbToHsv } from '../utils/colorConverters';

class HsvColorPicker extends Component {
  constructor(props) {
    super(props);
    const hsvColor = rgbToHsv(props.rgbColor.r, props.rgbColor.g, props.rgbColor.b);
    this.state = {
      valueH: hsvColor.h,
      valueS: hsvColor.s,
      valueV: hsvColor.v,
    }
  }

  componentWillReceiveProps(nextProps) {
    const hsvColor = rgbToHsv(nextProps.rgbColor.r, nextProps.rgbColor.g, nextProps.rgbColor.b);
    this.setState({ valueH: Math.round(hsvColor.h * 360), valueS: hsvColor.s, valueV: hsvColor.v });
  }

  handleChangeInputH(e) {
    const valueH = parseInt(e.target.value) / 360;
    this.setState({ valueH: valueH });
    const rgbColor = hsvToRgb(valueH, this.state.valueS, this.state.valueV);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeInputS(e) {
    const valueS = parseInt(e.target.value);
    this.setState({ valueS: valueS });
    const rgbColor = hsvToRgb(this.state.valueH, valueS, this.state.valueV);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeInputV(e) {
    const valueV = parseInt(e.target.value);
    this.setState({ valueV: e.target.value });
    const rgbColor = hsvToRgb(this.state.valueH, this.state.valueS, valueV);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeH(e, value) {
    const valueH = value / 360;
    const rgbColor = hsvToRgb(valueH, this.state.valueS, this.state.valueV);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeS(e, value) {
    const valueH = this.state.valueH / 360;
    const rgbColor = hsvToRgb(valueH, value, this.state.valueV);
    this.props.onSetRgbColor(rgbColor);
  }

  handleChangeV(e, value) {
    const valueH = this.state.valueH / 360;
    const rgbColor = hsvToRgb(valueH, this.state.valueS, value);
    this.props.onSetRgbColor(rgbColor);
  }

  render() {
    return (
      <div className="panel">
        <p className="panel-title">HSV:</p>
        <div className="option-row">
          <input
            className="option-input"
            type="number"
            value={this.state.valueH}
            onChange={this.handleChangeInputH.bind(this)}
          />
          <Slider
            className="slider"
            name="valueH"
            value={this.state.valueH}
            step={1}
            min={0}
            max={359}
            onChange={this.handleChangeH.bind(this)}
          />
        </div>
        <div className="option-row">
          <input
            className="option-input"
            type="number"
            value={this.state.valueS}
            onChange={this.handleChangeInputS.bind(this)}
          />
          <Slider
            className="slider"
            name="valueS"
            value={this.state.valueS}
            step={0.01}
            min={0}
            max={1}
            onChange={this.handleChangeS.bind(this)}
          />
        </div>
        <div className="option-row">
          <input
            className="option-input"
            type="number"
            value={this.state.valueV}
            onChange={this.handleChangeInputV.bind(this)}
          />
          <Slider
            className="slider"
            name="valueV"
            value={this.state.valueV}
            step={0.01}
            min={0}
            max={1}
            onChange={this.handleChangeV.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default HsvColorPicker;
