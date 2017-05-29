import React, { Component } from 'react';
import { HuePicker } from 'react-color';

class ColorPicker extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <HuePicker onChangeComplete={(color) => this.props.onSetHexColor(color.hex)} />
    );
  }
}

export default ColorPicker;
