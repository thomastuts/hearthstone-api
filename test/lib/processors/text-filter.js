var should = require('should');
var filter = require('../../../lib/filters/html');

var cardTexts = [
  {
    raw: '&amp;lt;b&amp;gt;Battlecry:&amp;lt;/b&amp;gt;Summon a 2/2 Pirate and destroy all Ninjas.',
    filtered: 'Battlecry: Summon a 2/2 Pirate and destroy all Ninjas.'
  },
  {
    raw: '&amp;lt;b&amp;gt;Hero Power&amp;lt;/b&amp;gt;\\n Summon a random Totem.',
    filtered: 'Hero Power: Summon a random Totem.'
  },
  {
    raw: '&amp;lt;b&amp;gt;Taunt&amp;lt;/b&amp;gt;',
    filtered: 'Taunt'
  },
  {
    raw: 'Draw a card. That card costs &amp;&#35;40;3&#41; less.',
    filtered: 'Draw a card. That card costs (3) less.'
  },
  {
    raw: '&lt;b&gt;Stealth&lt;/b&gt;. At the end of your turn, give another random friendly minion +1 Health.',
    filtered: 'Stealth. At the end of your turn, give another random friendly minion +1 Health.'
  }
];

describe('Mechanic and newline filtering', function () {
  it('should filter strings properly', function () {
    cardTexts.forEach(function (cardText) {
      filter(cardText.raw).should.equal(cardText.filtered);
    })
  });
});
