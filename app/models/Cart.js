const mongoose = require('../../db').mongoose;
mongoose.Promise = require('bluebird');
const cartSchema = require('../../schema/CartSchema');

module.exports = mongoose.model('Cart', cartSchema);