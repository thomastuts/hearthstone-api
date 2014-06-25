var _ = require('lodash');
var metadata = require('./metadata');

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

module.exports.parse = function(cardData) {
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
};
