var path = require('path');
var metadata = require('./metadata');
require('shelljs/global');
config.silent = true; // Squelches cp output for data that already exists, not sure if this is the right solution

var commands = {
  extract: 'java -jar vendor/disunity/disunity.jar extract '
};

var processors = {
  cards: require('./processors/cards'),
  textures: require('./processors/textures')
};

var archives = [
//  {
//    name: 'cardtextures0',
//    assets: [
//      {
//        type: 'Texture2D',
//        dir: 'textures/card_art'
//      }
//    ]
//  },
//  {
//    name: 'cardtextures1',
//    assets: [
//      {
//        type: 'Texture2D',
//        dir: 'textures/card_art'
//      }
//    ]
//  },
  {
    name: 'cardxml0',
    assets: [
      {
        type: 'TextAsset',
        dir: 'data/cards'
      }
    ]
  },
//  {
//    name: 'textures0',
//    assets: [
//      {
//        type: 'Texture2D',
//        dir: 'textures/medals-icons'
//      }
//    ]
//  }

];

archives.forEach(function (archive) {
  console.log('Processing ' + archive.name);

  console.log('Converting asset');
  exec(commands.extract + path.join('data/raw', metadata.version, 'Data', archive.name + (archive.extension || '.unity3d')), function () {
    console.log('Done extracting asset');

    archive.assets.forEach(function (asset) {

      // Create folder
      var convertedDestinationFolder = path.join('data/converted', metadata.version, asset.dir);
      var processedDestinationFolder = path.join('data/processed', metadata.version, asset.dir);
      mkdir('-p', convertedDestinationFolder);
      mkdir('-p', processedDestinationFolder);

      // TODO: remove all existing files in directory?

      // Copy converted data to converted/ folder
      console.log(path.join('data/raw', metadata.version, 'Data', archive.name, '*'));
      cp('-R', // copy recursively
        path.join('data/raw', metadata.version, 'Data', archive.name, 'CAB-' + archive.name, asset.type, '*'),
        convertedDestinationFolder
      );

      // TODO: Process the files based on asset type
      switch (asset.type) {
        case 'Texture2D':
          processors.textures.process(asset.dir);
          break;
        case 'TextAsset':
          processors.cards.process(asset.dir);
          console.log('Done');
          break;
      }


    });

    // TODO: Clean up
  });
});
