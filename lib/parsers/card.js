var _ = require('lodash');
var metadata = require('./../metadata');
var Case = require('case');

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
        card[Case.camel(field)] = value;
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
          card[Case.camel(field)][lang] = data[lang];
        }
      });
    }
  });

  var cardTextInHand = _.find(cardData.Entity.Tag, {name: 'CardTextInHand'});
  if (cardTextInHand && cardTextInHand.enUS) {
    console.log(cardTextInHand.enUS);
    var rawEffects = cardTextInHand.enUS.split(effectStartTag);
    var processedEffects = [];

    rawEffects.forEach(function (effect) {
      var processedEffect = effect.replace(effectEndTag, '');
      if (processedEffect) {
        processedEffect = processedEffect.replace('.', '');
        processedEffects.push(processedEffect);
      }
    });
  }

  card.effects = processedEffects;

  return card;
};
