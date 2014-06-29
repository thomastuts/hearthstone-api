var should = require('should');
var mechanicExtractor = require('../../../lib/extractors/mechanics');

var cards = [
  {
    description: 'Battlecry: Summon a 2/2 Pirate and destroy all Ninjas.',
    mechanics: ['Battlecry']
  },
  {
    description: 'Hero Power: Summon a random Totem.',
    mechanics: ['Hero Power']
  },
  {
    description: 'Taunt',
    mechanics: ['Taunt']
  },
  {
    description: 'Draw a card. That card costs (3) less.',
    mechanics: ['Draw cards']
  }
];

describe('Mechanic extraction', function () {
  it('should extract all mechanics from a card\'s description', function () {
    cards.forEach(function (card) {
      var extractedMechanics = mechanicExtractor(card.description);
      card.mechanics.forEach(function (mechanic) {
        extractedMechanics.should.containEql(mechanic);
      });
    });
  });
});
