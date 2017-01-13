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
    verifyCode: String,

    //管联字段
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        }
    ]
});