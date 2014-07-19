var restify = require('restify');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hsapi');
var db = mongoose.connection;

// Load card model
require('../lib/models/card');
var Card = mongoose.model('Card');

var server = restify.createServer();

server.get('/cards', function (req, res, next) {
  Card.find({}, function (err, cards) {
    if (err) throw err;
    res.json(cards);
  });
});

db.on('error', function (err) {
  console.log(err);
});

db.once('open', function callback () {
  server.listen(4000, function() {
    console.log('%s listening at %s', server.name, server.url);
  });
});
