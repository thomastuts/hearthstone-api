var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
  cardID: String,
  cardSet: String,
  category: String,
  faction: String,
  version: Number,
  rarity: String,
  type: String,
  cost: Number,
  attack: Number,
  health: Number,
  artist: String,
  name: {
    enUS: String
  },
  cardText: {
    enUS: String
  },
  flavorText: {
    enUS: String
  },
  mechanics: [String]
});

mongoose.model('Card', cardSchema);


//{
//  "cardID": "EX1_043",
//  "version": 2,
//  "cardSet": "3",
//  "rarity": "Rare",
//  "cardType": "Minion",
//  "faction": "3",
//  "cost": "4",
//  "atk": "4",
//  "health": "1",
//  "artistName": "Jaemin Kim",
//  "cardName": {
//  "enUS": "Twilight Drake"
//},
//  "cardTextInHand": {
//  "enUS": "Battlecry: Gain +1 Health for each card in your hand."
//},
//  "flavorText": {
//  "enUS": "Twilight drakes feed on Mystical Energy. And Tacos."
//},
//  "mechanics": [
//  "Battlecry",
//  "Buff Stats"
//],
//  "category": "EX1"
//}
