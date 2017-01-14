const mongoose = require('../../db').mongoose;
mongoose.Promise = require('bluebird');
const goodSchema = require('../../schema/GoodSchema');

module.exports = mongoose.model('Good', goodSchema);