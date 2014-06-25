var parser = require('xml2json');
var prettyjson = require('prettyjson');
var Table = require('cli-table');
var _ = require('lodash');

var fs = require('fs');
var path = require('path');

var metadata = require('./metadata');

var excludedFilePatterns = [
  'XXX', // Miscellaneous function cards (disconnect, ...)
  'TU4' // Tutorial cards
];

var loggers = {
  cardInfo: function (file, card) {
    var table = new Table({
      colWidths: [10, 50]
    });

    var fields = [
      {
        name: 'CardName',
        prop: 'enUS'
      },
      {
        name: 'Rarity'
      },
      {
        name: 'CardType'
      },
      {
        name: 'Cost'
      },
      {
        name: 'Atk'
      },
      {
        name: 'Health'
      },
      {
        name: 'Elite'
      },
      {
        name: 'CardTextInHand',
        prop: 'enUS'
      }
    ];

    table.push(
      {
        'File': file
      }
    );

    fields.forEach(function (field) {
      var obj = {};
      var data = _.find(card.Entity.Tag, {name: field.name});
      if (data) {
        var value = data[field.prop || 'value'];
        if (metadata[field.name] && metadata[field.name]['' + value]) {
          value = metadata[field.name]['' + value];
//          console.log(references[field.name]['' + value]);
        }
        obj[field.name] = value;
        table.push(obj);
      }
    });

    console.log(table.toString());
  }
};

//var cardXml = fs.readFileSync('./data/raw/CRED_01.txt', 'utf-8');
//var card = JSON.parse(parser.toJson(cardXml));
//console.log(JSON.stringify(card, null, 2));
//loggers.cardInfo('CRED_01.txt', card);

readAllCards();

function readAllCards() {
  fs
    .readdirSync('./data/sample')
    .forEach(function(file) {
      var shouldProcess = true;

      excludedFilePatterns.forEach(function (pattern) {
        if (file.indexOf(pattern) != -1) {
          shouldProcess = false;
        }
      });

      if (shouldProcess) {
        var cardXml = fs.readFileSync(path.join('./data/sample', file), 'utf-8');
        var card = JSON.parse(parser.toJson(cardXml));
        loggers.cardInfo(file, card);
      }

    });
}


