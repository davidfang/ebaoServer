const mongoose = require('../db').mongoose;

module.exports = mongoose.Schema({
    count: String,

    //关联字段,购买者
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //关联字段,宝贝
    goodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Good'
    }
});