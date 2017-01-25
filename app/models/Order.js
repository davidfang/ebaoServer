const mongoose = require('../../db').mongoose;
mongoose.Promise = require('bluebird');
const orderSchema = require('../../schema/OrderSchema');

module.exports = mongoose.model('Order', orderSchema);