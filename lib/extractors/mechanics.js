// This should take an incoming string and find matches for all mechanics

var mechanics = [
  {
    name: 'Taunt',
    match: /Taunt/gi
  },
  {
    name: 'Battlecry',
    match: /Battlecry/gi
  },
  {
    name: 'Hero Power',
    match: /Hero Power/gi
  },
  {
    name: 'Draw cards',
    match: /Draw [a0-9] cards?/gi
  }
];

module.exports = function (string) {
  var cardMechanics = [];

  mechanics.forEach(function (mechanic) {
    var match = string.match(mechanic.match);
    if (match && match.length > 0) {
      cardMechanics.push(mechanic.name);
    }
  });

  return cardMechanics;
};
