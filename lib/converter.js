var parser = require('xml2json');
var cardParser = require('./card-parser');
var prettyjson = require('prettyjson');
var Table = require('cli-table');

var fs = require('fs');
var path = require('path');

var metadata = require('./metadata');

fs
  .readdirSync('./data/sample')
  .forEach(function(file) {

    console.log('\n\n\n--------------------------------------------------');
    var cardXml = fs.readFileSync(path.join('./data/sample', file), 'utf-8');
    var card = JSON.parse(parser.toJson(cardXml));

    var parsedCard = cardParser.parse(card);

    console.log(prettyjson.render(parsedCard));
    console.log('--------------------------------------------------');

  });
