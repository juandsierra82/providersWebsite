var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function (callback) {

  console.log('connected to the database')

});

module.exports = db;