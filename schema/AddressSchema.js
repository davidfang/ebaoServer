const mongoose = require('../db').mongoose;

module.exports = new mongoose.Schema({
    name: String,
    telephone: String,
    address: String,
    isDefault: {
        type: Boolean,
        default: false
    }
});