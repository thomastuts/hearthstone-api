var _ = require('lodash');
var _s = require('underscore.string');
var metadata = require('./../metadata');
var Case = require('case');
var htmlFilter = require('../filters/html');
var mechanicExtractor = require('../extractors/mechanics');

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

var effectStartTag = '&amp;lt;b&amp;gt;';
var effectEndTag = '&amp;lt;/b&amp;gt;';

module.exports.parse = function(cardData) {
  var card = {};

  card.cardID = cardData.Entity.CardID;
  card.version = cardData.Entity.version;

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
        card[Case.camel(field)] = _s.clean(value);
      }
    }
  });

  // Parse all plural fields
  pluralFields.forEach(function (field) {
    var data = _.find(cardData.Entity.Tag, {name: field});
    if (data) {
      card[Case.camel(field)] = {};
      metadata.languages.forEach(function (lang) {
        if (data[lang]) {
          card[Case.camel(field)][lang] = _s.clean(htmlFilter(data[lang]));
        }
      });
    }
  });

  if (card.cardTextInHand) {
    var mechanics = mechanicExtractor(card.cardTextInHand.enUS);
    if (mechanics.length > 0) {
      card.mechanics = mechanics;
    }
  }

  return card;
};
