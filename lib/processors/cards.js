var parser = require('xml2json');
var cardParser = require('./../parsers/card');
var fs = require('fs');
var path = require('path');
var logger = require('./../logger');
var metadata = require('./../metadata');

var cards = [];
//var cardDirectory = path.join('data/converted', metadata.version, 'cards');

module.exports.process = function (cardDirectory) {
  fs
    .readdirSync(cardDirectory)
    .forEach(function(file) {
      var cardXml = fs.readFileSync(path.join(cardDirectory, file), 'utf-8');
      var card = JSON.parse(parser.toJson(cardXml));
      var parsedCard = cardParser.parse(card);
      parsedCard.category = file.split('_')[0];

      cards.push(parsedCard);

      logger.full(parsedCard);
    });

  var processedCardsPath = path.join('data/processed', metadata.version, 'cards', metadata.version + '.json');
  console.log(processedCardsPath);
  fs.writeFile(processedCardsPath, JSON.stringify(cards, null, 2), function (err) {
    if (err) throw err;
    console.log('Saved ' + cards.length + ' cards saved to ' + processedCardsPath);
  });
};
