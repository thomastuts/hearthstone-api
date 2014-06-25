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

var singularFields = [
  'CardSet',
  'Rarity',
  'CardType',
  'Faction',
  'Class',
  'Cost',
  'Atk',
  'Health',
  'Elite',
  'ArtistName'
];

var pluralFields = [
  'CardName',
  'CardTextInHand',
  'FlavorText'
];

var fields = [
  {
    name: 'CardName',
    props: metadata.languages
  },
  {
    name: 'CardSet'
  },
  {
    name: 'Rarity'
  },
  {
    name: 'CardType'
  },
  {
    name: 'Faction'
  },
  {
    name: 'Class'
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
    props: metadata.languages
  },
  {
    name: 'FlavorText',
    props: metadata.languages
  },
  {
    name: 'ArtistName',
    prop: metadata.languages
  }
];


var loggers = {
  cardInfo: function (file, card) {
    var table = new Table({
      colWidths: [10, 50]
    });

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

var cardXml = fs.readFileSync('./data/raw/EX1_537.txt', 'utf-8');
var card = JSON.parse(parser.toJson(cardXml));
console.log(prettyjson.render(convertCard(card)));
//console.log(JSON.stringify(card, null, 2));

//readAllCards();

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

function convertCard(cardData) {
  var card = {};

  // Parse all singular fields
  singularFields.forEach(function (field) {
    var data = _.find(cardData.Entity.Tag, {name: field});
    if (data) {
      // The artist is kind of a plural field but is only enUS so we treat it as a singular field instead
      var value = data[field === 'ArtistName' ? 'enUS' : 'value'];
      if (metadata[field] && metadata[field]['' + value]) {
        value = metadata[field]['' + value];
      }
      if (value) {
        card[field] = value;
      }
    }
  });

  // Parse all plural fields
  pluralFields.forEach(function (field) {
    var data = _.find(cardData.Entity.Tag, {name: field});
    if (data) {
      card[field] = {};
      metadata.languages.forEach(function (lang) {
        if (data[lang]) {
          card[field][lang] = data[lang];
        }
      });
    }
  });

  return card;
}


