var parser = require('xml2json');
var cardParser = require('./card-parser');
var prettyjson = require('prettyjson');
var Table = require('cli-table');

var fs = require('fs');
var path = require('path');

var metadata = require('./metadata');
var logger = require('./logger');

fs
  .readdirSync('./data/sample')
  .forEach(function(file) {
    var cardXml = fs.readFileSync(path.join('./data/sample', file), 'utf-8');
    var card = JSON.parse(parser.toJson(cardXml));
    var parsedCard = cardParser.parse(card);
    parsedCard.file = file;

    logger.full(parsedCard);
  });
