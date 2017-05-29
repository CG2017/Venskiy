import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import Dropzone from 'react-dropzone'
import convert from './utils/convert.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    picture: '/images/1305х864х183.jpg',
    dataR: [],
    dataG: [],
    dataB: [],
  };

  componentWillMount() {
    this.countPixels();
  };

  getBitmap = path => new Promise((resolve, reject) => {
    const image = new Image();
    image.src = path;
    console.log(path);
    image.onload = () => {
      this.refs.canvas.width = image.width;
      this.refs.canvas.height = image.height;

      window.createImageBitmap(image).then(img => {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const image = ctx.getImageData(0, 0, img.width, img.height).data;
        const pixels = [];
        for (let i = 0; i < img.width * img.height * 4; i += 4) {
          pixels.push({
            R: image[i],
            G: image[i + 1],
            B: image[i + 2],
          });
        }
      resolve(pixels);
      });
    }
  });

  countPixels() {
    this.getBitmap(this.state.picture)
      .then(pixels => {
        const r = [];
        const g = [];
        const b = [];
        const dataR = [];
        const dataG = [];
        const dataB = [];
        let averageR = 0;
        let averageG = 0;
        let averageB = 0;

        for (let i = 0; i < 256; i++) {
          r[i] = 0;
          g[i] = 0;
          b[i] = 0;
        }

        pixels.forEach(pixel => {
          r[pixel.R]++;
          g[pixel.G]++;
          b[pixel.B]++;
          averageR += pixel.R;
          averageG += pixel.G;
          averageB += pixel.B;
        });
        averageR /= pixels.length;
        averageG /= pixels.length;
        averageB /= pixels.length;

        r.forEach((amount, i) => {
          dataR.push({
            name: `${i}`,
            amount,
          });
        });

        g.forEach((amount, i) => {
          dataG.push({
            name: `${i}`,
            amount,
          });
        });

        b.forEach((amount, i) => {
          dataB.push({
            name: `${i}`,
            amount,
          });
        });

        this.setState({
          dataR,
          dataG,
          dataB,
        });

        console.dir(this.dataR);
        document.getElementById('averageR').innerHTML = `R: ${averageR.toFixed(3)}`;
        document.getElementById('averageG').innerHTML = `G: ${averageG.toFixed(3)}`;
        document.getElementById('averageB').innerHTML = `B: ${averageB.toFixed(3)}`;

        this.initPixels = pixels;
      });
  };

  handleDropFile(acceptedFiles, rejectedFiles) {
    console.log(acceptedFiles, rejectedFiles);
    this.setState({ picture: acceptedFiles[0].preview });
    console.log(acceptedFiles[0].preview);
    setTimeout(() => this.countPixels(), 100);
  };

  render() {
    return (
      <div className="App">
        <Dropzone onDrop={this.handleDropFile.bind(this)} />
        <canvas ref="canvas" id="canvasily"></canvas>
        <div className="wrapper">
          <div className="original-picture">
          </div>
          <div id="averageR"></div>
          <div id="averageG"></div>
          <div id="averageB"></div>
          <BarChart width={1368} height={500} data={this.state.dataR}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="amount" fill="#ff0000" />
          </BarChart>
          <BarChart width={1368} height={500} data={this.state.dataG}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="amount" fill="#00ff00" />
          </BarChart>
          <BarChart width={1368} height={500} data={this.state.dataB}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="amount" fill="#0000ff" />
          </BarChart>
        </div>
      </div>
    );
  }
}

export default App;
