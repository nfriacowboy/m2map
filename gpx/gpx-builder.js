const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

function copyMarkers() {
  const sourceFolder = './gpx/markers';
  const destinationFolder = './src/assets/gpx/markers';
  copyFolderContents(sourceFolder, destinationFolder);
}

function copyTraks() {
  const sourceFolder = './gpx/tracks';
  const destinationFolder = 'src/assets/gpx/tracks';
  copyFolderContents(sourceFolder, destinationFolder);
}

function copyFolderContents(sourceFolder, destinationFolder) {
  fs.readdirSync(sourceFolder).forEach(file => {
    const sourceFile = path.join(sourceFolder, file);
    const destinationFile = path.join(destinationFolder, file);
    fse.copySync(sourceFile, destinationFile);
  });
}

/*
function extractMetadata(filename) {
  const data = fs.readFileSync(filename);
  const parser = new xml2js.Parser();
  let metadata = '';
  parser.parseString(data, (err, result) => {
    if (err) {
      throw new Error(err);

    }
    metadata = result.gpx.metadata[0];
  });
  return metadata;
}

function buildTracksInfo() {
  const sourceFolder = './gpx/tracks';
  const destinationFolder = path.join('src', 'assets', 'gpx', 'track-info');
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  }

  fs.readdirSync(sourceFolder).forEach(file => {
    const fileInfo = extractMetadata(path.join(sourceFolder, file));
    const jsonFile = file.replace('gpx', 'json');
    const destination = path.join(destinationFolder, jsonFile);
    fs.writeFileSync(destination, JSON.stringify(fileInfo));
  });
}*/


copyMarkers();
copyTraks();
//buildTracksInfo();
