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
    },
    //关联字段,用户
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});