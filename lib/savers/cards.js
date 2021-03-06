var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hsapi');
var db = mongoose.connection;
var fs = require('fs');

// Load card model
require('../models/card');

var Card = mongoose.model('Card');

module.exports = function (cards) {
  db.on('error', function (err) {
    console.log(err);
  });

  db.once('open', function callback () {
    cards.forEach(function (card) {
      var persistedCard = new Card({
        cardID: card.cardID,
        name: card.cardName,
        cardSet: card.cardSet,
        category: card.category,
        faction: card.faction,
        version: parseInt(card.version),
        rarity: card.rarity,
        type: card.cardType,
        cost: card.cost ? parseInt(card.cost) : undefined,
        attack: card.atk ? parseInt(card.atk) : undefined,
        health: card.health ? parseInt(card.health) : undefined,
        mechanics: card.mechanics,
        cardText: card.cardTextInHand,
        flavorText: card.flavorText,
        artist: card.artistName
      });

      persistedCard.save(function (err, card) {
        if (err) throw err;
        console.log('Saved card:', card.cardID);
      });
    });
  });
};
