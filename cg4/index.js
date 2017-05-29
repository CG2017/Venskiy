const path = require('path');
const fs = require('fs');
const exiftool = require('node-exiftool');
const Promise = require("bluebird");

const exiftoolPath = path.resolve(__dirname, 'exiftool');
const ep = new exiftool.ExiftoolProcess(`${exiftoolPath}/exiftool`);

const imagesPath = path.resolve(__dirname, 'bigImages');

fs.readdir(imagesPath, (err, files) => {
  const absoluteImagesPath = files.map(file => `${imagesPath}/${file}`);
  ep.open()
    .then((pid) => console.log('Started exiftool process %s', pid))
    .then(() => Promise.map(absoluteImagesPath, path => ep.readMetadata(path)))
    .then(imagesExiftoolData => {
      console.dir(imagesExiftoolData[0]);
      const imagesData = imagesExiftoolData.map(({data}) => ({
        FileName: data[0].FileName,
        FileType: data[0].FileType,
        FileSize: data[0].FileSize,
        ImageWidth: data[0].ImageWidth,
        ImageHeight: data[0].ImageHeight,
        ImageLength: data[0].ImageLength,
        Compression: data[0].Compression,
        ResolutionUnit: data[0].ResolutionUnit,
        XResolution: data[0].XResolution,
        YResolution: data[0].YResolution,
        BitDepth: data[0].BitDepth,
        PixelsPerMeterX: data[0].PixelsPerMeterX,
        PixelsPerMeterY: data[0].PixelsPerMeterY,
      }));

      imagesData.forEach(data => {
        for (let key in data) {
          if (data[key] !== undefined) {
            console.log(`${key}: ${data[key]}`);
          }
        }
        console.log('\n');
      });
    })
    .then(() => ep.close())
    .then(() => console.log('Closed exiftool'));
});
