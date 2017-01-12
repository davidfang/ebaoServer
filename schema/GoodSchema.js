module.exports = (function () {
    const mongoose = require('../db').mongoose;
    mongoose.Promise = require('bluebird');
    const schema = {
        title: String,
        desc: String,
        url: String,
        price: String
    };

    const collectionName = 'goods';
    const GoodSchema = mongoose.Schema(schema);

    return mongoose.model(collectionName, GoodSchema);
})();