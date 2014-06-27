var path = require('path');
var metadata = require('./metadata');
require('shelljs/global');
config.silent = true; // Squelches cp output for data that already exists, not sure if this is the right solution

var commands = {
  extract: 'java -jar vendor/disunity/disunity.jar extract '
};

var archives = [
  {
    name: 'cardtextures0',
    assets: [
      {
        type: 'Texture2D',
        convertedDir: 'textures/card_art'
      }
    ]
  }
];

archives.forEach(function (archive) {
  console.log('Processing ' + archive.name);

  console.log('Converting asset');
  exec(commands.extract + path.join('data/raw', metadata.version, 'Data', archive.name + (archive.extension || '.unity3d')), function () {
    console.log('Done extracting asset');

    archive.assets.forEach(function (asset) {

      // Create folder
      var convertedDestinationFolder = path.join('data/converted', metadata.version, asset.convertedDir);
      mkdir('-p', convertedDestinationFolder);

      // TODO: remove all existing files in directory?

      // Copy converted data to converted/ folder
      console.log(path.join('data/raw', metadata.version, 'Data', archive.name, '*'));
      cp('-R', // copy recursively
        path.join('data/raw', metadata.version, 'Data', archive.name, 'CAB-' + archive.name, asset.type, '*'),
        convertedDestinationFolder
      );

      // TODO: Process the files based on asset type

    });

    // TODO: Clean up
  });
});
