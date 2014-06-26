var path = require('path');
var sys = require('sys');
var mkdirp = require('mkdirp');
var exec = require('child_process').exec;
var metadata = require('./metadata');
var fs = require('fs');
var child;

var disunityLocation = 'java -jar vendor/disunity/disunity.jar';

var baseCommands = {
  extract: disunityLocation + ' extract '
};

var utilityCommands = {
  move: {
    cards: 'mv '+
    path.join('data/raw', metadata.version, 'Data/cardxml0/CAB-cardxml0/TextAsset/*') + ' ' +
    path.join('data/converted', metadata.version, 'cards')
  }
};

var processCommands = {
  cards: function () {
    var self = this;

    // Create directory that will hold all files
    var processedDir = path.join('data/converted', metadata.version, 'cards');
    var rawDir = path.join('data/raw', metadata.version);

    mkdirp(processedDir, function (err) {
      if (err) throw err;
      // TODO: create collection with files to be converted
      runShellCommand(baseCommands.extract + path.join(rawDir, 'Data/cardxml0.unity3d'), function () {
        console.log('Done extracting files!');

        // TODO: use Node to move the files instead of a native UNIX command
        runShellCommand(utilityCommands.move.cards, function () {
          console.log('Done moving files!');
        });
      });
    });
  }
};

processCommands.cards();


function runShellCommand(cmd, cb) {
  console.log('Running command: ' + cmd);
  child = exec(cmd, function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    cb();
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
