var parser = require('xml2json');
var cardParser = require('./../parsers/card');
var fs = require('fs');
var path = require('path');
var logger = require('./../logger');
var metadata = require('./../metadata');

var cards = [];

module.exports.process = function (dir) {
  var cardDirectory = path.join('data/converted', metadata.version, dir);

  fs
    .readdirSync(cardDirectory)
    .forEach(function(file) {
      var cardXml = fs.readFileSync(path.join(cardDirectory, file), 'utf-8');
      var card = JSON.parse(parser.toJson(cardXml));
      console.log(card);
      var parsedCard = cardParser.parse(card);
      parsedCard.category = file.split('_')[0];

      cards.push(parsedCard);

//      logger.full(parsedCard);
    });

  var processedCardsPath = path.join('data/processed', metadata.version, dir, 'cards.json');
  fs.writeFile(processedCardsPath, JSON.stringify(cards, null, 2), function (err) {
    if (err) throw err;
  });
};
