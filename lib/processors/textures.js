var fs = require('fs');
var path = require('path');
var gm = require('gm');
var metadata = require('../metadata');

// textures/card_art

module.exports.process = function (dir) {
  var texturePath = path.join('data/converted', metadata.version, dir);

  fs
    .readdirSync(texturePath)
    .forEach(function(file) {

      gm(path.join(texturePath, file))
        .options({imageMagick: true})
        .rotate('black', 180)
        .write(path.join('data/processed', metadata.version, dir, file).replace('.dds', '.png'), function (err) {
          if (err) throw err;
        });
    });
};
