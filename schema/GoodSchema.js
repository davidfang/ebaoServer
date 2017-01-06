module.exports = (function () {
    const mongoose = require('../db').mongoose;
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