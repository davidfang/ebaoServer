const mongoose = require('../db').mongoose;

module.exports = new mongoose.Schema({
    name: String,
    telephone: String,
    area: Array,
    detail: String,
    address: String,
    isDefault: {
        type: Boolean,
        default: false
    }
});