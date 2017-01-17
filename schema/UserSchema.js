const mongoose = require('../db').mongoose;

module.exports = new mongoose.Schema({
    mail: {
        unique: true,
        type: String
    },
    username: {
        unique: true,
        type: String
    },
    password: String,
    avatar: String,
    gender: String,

    //关联字段,地址列表
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        }
    ]
});