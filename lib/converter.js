var parser = require('xml2json');
var cardParser = require('./card-parser');
var fs = require('fs');
var path = require('path');
var logger = require('./logger');
var metadata = require('./metadata');

var cards = [];
var cardDirectory = 'sample-cards';

fs
  .readdirSync(path.join('data', cardDirectory))
  .forEach(function(file) {
    var cardXml = fs.readFileSync(path.join('data', cardDirectory, file), 'utf-8');
    var card = JSON.parse(parser.toJson(cardXml));
    var parsedCard = cardParser.parse(card);
    var category = file.split('_')[0];

    console.log(JSON.stringify(card, null, 2));

    parsedCard.file = file;
    parsedCard.category = category;

    cards.push(parsedCard);

    logger.full(parsedCard);
  });

var convertedCardsPath = path.join('data/processed/cards', metadata.version + '.json');
console.log(convertedCardsPath);
fs.writeFile(convertedCardsPath, JSON.stringify(cards, null, 2), function (err) {
  if (err) throw err;
  console.log('Saved ' + cards.length + ' cards saved to ' + convertedCardsPath);
});
