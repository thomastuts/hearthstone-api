var parser = require('xml2json');
var cardParser = require('./card-parser');
var fs = require('fs');
var path = require('path');
var logger = require('./logger');
var metadata = require('./metadata');

var cards = [];

fs
  .readdirSync('./data/raw')
  .forEach(function(file) {
    var cardXml = fs.readFileSync(path.join('./data/raw', file), 'utf-8');
    var card = JSON.parse(parser.toJson(cardXml));
    var parsedCard = cardParser.parse(card);
    var category = file.split('_')[0];

    parsedCard.file = file;
    parsedCard.category = category;

    cards.push(parsedCard);

    logger.full(parsedCard);
  });

var convertedCardsPath = path.join('data/converted/', metadata.version + '.json');
console.log(convertedCardsPath);
fs.writeFile(convertedCardsPath, JSON.stringify(cards, null, 2), function (err) {
  if (err) throw err;
  console.log('Saved ' + cards.length + ' cards saved to ' + convertedCardsPath);
});
