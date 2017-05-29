import React, { Component } from 'react';

import '../style/App.css';
import ColorPicker from './ColorPicker';
import RgbColorPicker from './RgbColorPicker';
import HsvColorPicker from './HsvColorPicker';
import CmyColorPicker from './CmyColorPicker';
import LabColorPicker from './LabColorPicker';
import { hexToRgb, rgbToHex, isValidRgb } from '../utils/colorConverters';

class App extends Component {
  constructor(props) {
    super(props);
    const rgbColor = hexToRgb('#ffffff');
    this.state = {
      color: '#ffffff',
      rgbColor: rgbColor,
      isError: true,
    }
  }

  handleChangeHexColor(hexColor) {
    const rgbColor = hexToRgb(hexColor);
    this.setState({ color: hexColor, rgbColor: rgbColor });
  }

  handleChangeRgbColor(rgbColor) {
    if (isValidRgb(rgbColor)) {
      this.setState({ isError: false });
      const hexColor = rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);
      this.setState({ color: hexColor, rgbColor: rgbColor });
    } else {
      this.setState({ isError: true });
    }
  }

  render() {
    return (
      <div className="App container">
        <div className="row-small">
          <div className="color-picker"><ColorPicker onSetHexColor={this.handleChangeHexColor.bind(this)} /></div>
          <div className="banner" style={{ backgroundColor: this.state.color }}></div>
        </div>
        <div className="row">
          <RgbColorPicker
            hexColor={this.state.color}
            onSetHexColor={this.handleChangeHexColor.bind(this)}
          />
          <HsvColorPicker
            rgbColor={this.state.rgbColor}
            onSetRgbColor={this.handleChangeRgbColor.bind(this)}
          />
        </div>
        <div className="row">
          <CmyColorPicker
            rgbColor={this.state.rgbColor}
            onSetRgbColor={this.handleChangeRgbColor.bind(this)}
          />
          <LabColorPicker
            rgbColor={this.state.rgbColor}
            onSetRgbColor={this.handleChangeRgbColor.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
