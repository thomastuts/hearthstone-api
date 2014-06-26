var path = require('path');
var sys = require('sys');
var exec = require('child_process').exec;
var metadata = require('./metadata');
var child;

var disunityLocation = 'java -jar vendor/disunity/disunity.jar';

var baseCommands = {
  extract: disunityLocation + ' extract '
};

var commands = {
  convert: {
    cards: baseCommands.extract + path.join('data/raw', metadata.version, 'Data/Win/cardxml0.unity3d')
  },
  move: {
    cards: 'mkdir -p ' + path.join('data/processed', metadata.version, 'cards') + '; ' +
              'mv '+
              path.join('data/raw', metadata.version, 'Data/Win/cardxml0/CAB-cardxml0/TextAsset/*') + ' ' +
              path.join('data/processed', metadata.version, 'cards')
  }
};

runShellCommand(commands.move.cards);

function runShellCommand(cmd) {
  console.log('Running command: ' + cmd);
  child = exec(cmd, function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
