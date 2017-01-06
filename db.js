const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.dbPath);
const db = mongoose.connection;

db.on('error', function () {
    console.log('error occurred from db');
});

db.once('open', function () {
    console.log('successfully opened the db');
});

module.exports.mongoose = mongoose;