const mongoose = require('../../db').mongoose;
mongoose.Promise = require('bluebird');
const addressSchema = require('../../schema/AddressSchema');

module.exports = mongoose.model('Address', addressSchema);