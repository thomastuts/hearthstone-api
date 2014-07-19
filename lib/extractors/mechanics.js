// This should take an incoming string and find matches for all mechanics

var mechanics = [
  {
    name: 'Battlecry',
    match: /Battlecry/gi
  },
  {
    name: 'Buff Stats',
    match: /\+[0-9+]/gi // TODO: this is too broad, it also includes spell damage
  },
  {
    name: 'Can\'t Attack',
    match: /Can't attack/gi
  },
  {
    name: 'Change Cost',
    match: /\([0-9]+\)/gi // Format: card costs (2) less
  },
  {
    name: 'Change Stats',
    match: /Change/gi
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
    name: 'Combo',
    match: /Combo/gi
  },
  {
    name: 'Copy',
    match: /Copy/gi
  },
  {
    name: 'Counter',
    match: /Counter/gi
  },
  {
    name: 'Damage All',
    match: /[0-9] damage to all/gi // TODO: regex for Mad Bomber
  },
  {
    name: 'Damage Enemies',
    match: /to all enem/gi // TODO: include Swipe
  },
  {
    name: 'Deal Damage',
    match: /deal [0-9]+ damage/gi // TODO: this should be expanded a lot, see http://www.hearthhead.com/mechanic=64/deal-damage
  },
  {
    name: 'Deathrattle',
    match: /Deathrattle/gi
  },
  {
    name: 'Destroy',
    match: /Destroy/gi
  },
  {
    name: 'Discard',
    match: /Discard/gi
  },
  {
    name: 'Divine Shield',
    match: /Divine Shield/gi
  },
  {
    name: 'Draw Cards',
    match: /Draw [a0-9] cards?/gi // TODO: fix regex for CRED_09
  },
  {
    name: 'Enrage',
    match: /Enrage/gi
  },
  {
    name: 'Freeze',
    match: /Freeze/gi
  },
  {
    name: 'Gain Armor',
    match: /[0-9]+ armor/gi
  },
  {
    name: 'Grant Charge',
    match: /\+2 attack and charge/gi
  },
  {
    name: 'Grant Charge',
    match: /have charge/gi
  },
  {
    name: 'Grant Charge',
    match: /give it charge/gi
  },
  {
    name: 'Hero Power',
    match: /Hero Power/gi
  },
  {
    name: 'Immune',
    match: /Immune/gi
  },
  {
    name: 'Mana Crystals',
    match: /Mana Crystal/gi
  },
  {
    name: 'Overload',
    match: /Overload: \([0-9]+\)/gi
  },
  {
    name: 'Restore Health',
    match: /Restore/gi
  },
  {
    name: 'Return To Hand',
    match: /Return/gi
  },
  {
    name: 'Secret',
    match: /Secret/gi
  },
  {
    name: 'Silence',
    match: /Silence/gi
  },
  {
    name: 'Spell Damage',
    match: /Spell Damage \+[0-9]+/gi
  },
  {
    name: 'Stealth',
    match: /Stealth/gi
  },
  {
    name: 'Summon',
    match: /Summon/gi
  },
  {
    name: 'Take Control',
    match: /\w control/gi
  },
  {
    name: 'Taunt',
    match: /Taunt/gi
  },
  {
    name: 'Transform',
    match: /Transform/gi
  },
  {
    name: 'Windfury',
    match: /Windfury/gi
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
