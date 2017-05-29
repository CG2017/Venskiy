import React, { Component } from 'react';
import Slider from 'rc-slider';
import './style/App.css';
import 'rc-slider/assets/index.css';
var bresenham = require('bresenham-js');
import { calculateStepLine, calculateDdaLine, calculateCircle } from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'line',
      algorithm: 'step',
      squareSideWidth: 10,
      gridWidth: 30,
      gridHeight: 30,
      line: {
        x1: 0,
        y1: 0,
        x2: 2,
        y2: 10,
      },
      circle: {
        x: 10,
        y: 10,
        r: 6,
      },
    }
  };

  componentDidMount() {
    this.drawOnCanvas();
  };

  drawOnCanvas() {
    let ctx = this.refs.Canvas.getContext("2d");
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.clearRect(0, 0, this.state.gridWidth * this.state.squareSideWidth, this.state.gridHeight * this.state.squareSideWidth);
    ctx.stroke();
    ctx.beginPath()
    for (let i = 0; i <= this.state.gridWidth; ++i) {
      ctx.moveTo(i * this.state.squareSideWidth, 0);
      ctx.lineTo(i * this.state.squareSideWidth, this.state.gridHeight * this.state.squareSideWidth);
      ctx.moveTo(0, i * this.state.squareSideWidth);
      ctx.lineTo(this.state.gridHeight * this.state.squareSideWidth, i * this.state.squareSideWidth);
    }
    ctx.stroke();

    let points;
    if (this.state.tab === 'line') {
      switch (this.state.algorithm) {
        case 'step':
          points = calculateStepLine(this.state.line.x1,
                                     this.state.line.y1,
                                     this.state.line.x2,
                                     this.state.line.y2);
          break;
        case 'dda':
          points = calculateDdaLine(this.state.line.x1,
                                    this.state.line.y1,
                                    this.state.line.x2,
                                    this.state.line.y2);
          break;
        case 'bresenham':
          points = bresenham([this.state.line.x1, this.state.line.y1],
                             [this.state.line.x2, this.state.line.y2]);
          break;
        default:
          points = calculateStepLine(this.state.line.x1,
                                     this.state.line.y1,
                                     this.state.line.x2,
                                     this.state.line.y2);
      }
      points.forEach(point => {
        ctx.fillRect(point[0] * this.state.squareSideWidth,
                     point[1] * this.state.squareSideWidth,
                     this.state.squareSideWidth,
                     this.state.squareSideWidth);
      });
      ctx.beginPath();
      ctx.strokeStyle = '#52ff40';
      ctx.moveTo(this.state.line.x1 * this.state.squareSideWidth,
                 this.state.line.y1 * this.state.squareSideWidth);
      ctx.lineTo(this.state.line.x2 * this.state.squareSideWidth,
                 this.state.line.y2 * this.state.squareSideWidth);
      ctx.stroke();
    } else {
      points = calculateCircle(this.state.circle.x, this.state.circle.y, this.state.circle.r);
      points.forEach(point => {
        ctx.fillRect(point[0] * this.state.squareSideWidth,
                     point[1] * this.state.squareSideWidth,
                     this.state.squareSideWidth,
                     this.state.squareSideWidth);
      });
      ctx.beginPath();
      ctx.strokeStyle = '#52ff40';
      ctx.arc(this.state.circle.x * this.state.squareSideWidth,
              this.state.circle.y * this.state.squareSideWidth,
              this.state.circle.r * this.state.squareSideWidth,
              0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  handleChangeTab(e) {
    this.setState({ tab: e.target.value });
    setTimeout(() => this.drawOnCanvas(), 1);
  };

  handleChangeGrid(val) {
    this.setState({
      gridWidth: val,
      gridHeight: val
    });
    setTimeout(() => this.drawOnCanvas(), 1);
  };

  handleChangeAlgorithm(e) {
    this.setState({ algorithm: e.target.value });
    setTimeout(() => this.drawOnCanvas(), 1);
  };

  render() {
    return (
      <div className="App">
        <form className="options-panel">
          <div>
            <input
              type="radio"
              value="line"
              checked={this.state.tab==='line'}
              onChange={this.handleChangeTab.bind(this)}
            />Line
            <input
              type="radio"
              value="circle"
              checked={this.state.tab==='circle'}
              onChange={this.handleChangeTab.bind(this)}
            />Circle
          </div>
          <Slider
            min={10}
            max={80}
            step={10}
            value={this.state.gridWidth}
            onChange={this.handleChangeGrid.bind(this)}
          />
          {this.state.tab === 'line' ? (
            <div>
              <select value={this.state.algorithm} onChange={this.handleChangeAlgorithm.bind(this)}>
                <option value="step">Step</option>
                <option value="dda">DDA</option>
                <option value="bresenham">Bresenham</option>
              </select>
              <div>
                X1:
                <input type="number" value={this.state.line.x1} onChange={(e) => {
                  this.setState({ line: {...this.state.line, x1: parseInt(e.target.value) }});
                  setTimeout(() => this.drawOnCanvas(), 1);
                }} />
              </div>
              <div>
                Y1:
                <input type="number" value={this.state.line.y1} onChange={(e) => {
                  this.setState({ line: {...this.state.line, y1: parseInt(e.target.value) }});
                  setTimeout(() => this.drawOnCanvas(), 1);
                }} />
              </div>
              <div>
                X2:
                <input type="number" value={this.state.line.x2} onChange={(e) => {
                  this.setState({ line: {...this.state.line, x2: parseInt(e.target.value) }});
                  setTimeout(() => this.drawOnCanvas(), 1);
                }} />
              </div>
              <div>
                Y2:
                <input type="number" value={this.state.line.y2} onChange={(e) => {
                  this.setState({ line: {...this.state.line, y2: parseInt(e.target.value) }});
                  setTimeout(() => this.drawOnCanvas(), 1);
                }} />
              </div>
            </div>
          ) : (
            <div>
              <div>
                X:
                <input type="number" value={this.state.circle.x} onChange={(e) => {
                  this.setState({ circle: {...this.state.circle, x: parseInt(e.target.value) }});
                  setTimeout(() => this.drawOnCanvas(), 1);
                }} />
              </div>
              <div>
                Y:
                <input type="number" value={this.state.circle.y} onChange={(e) => {
                  this.setState({ circle: {...this.state.circle, y: parseInt(e.target.value) }});
                  setTimeout(() => this.drawOnCanvas(), 1);
                }} />
              </div>
              <div>
                R:
                <input type="number" value={this.state.circle.r} onChange={(e) => {
                  this.setState({ circle: {...this.state.circle, r: parseInt(e.target.value) }});
                  setTimeout(() => this.drawOnCanvas(), 1);
                }} />
              </div>
            </div>
          )}
        </form>
        <canvas
          ref="Canvas"
          width={this.state.gridWidth * this.state.squareSideWidth}
          height={this.state.gridHeight * this.state.squareSideWidth}
        />
      </div>
    );
  }
}

export default App;
