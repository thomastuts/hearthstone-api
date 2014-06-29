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
  },
  {
    name: 'Divine Shield',
    match: /Divine Shield/gi
  },
  {
    name: 'Can\t Attack',
    match: /Can't attack/gi
  },
  {
    name: 'Charge',
    match: /Charge/gi
  },
  {
    name: 'Choose One',
    match: /Choose one/gi
  },
  {
    name: 'Deathrattle',
    match: /Deathrattle/gi
  },
  {
    name: 'Enrage',
    match: /Enrage/gi
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
