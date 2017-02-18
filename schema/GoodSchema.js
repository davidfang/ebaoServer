const mongoose = require('../db').mongoose;

module.exports = new mongoose.Schema({
    title: String,
    desc: String,
    url: String,
    price: String,
    //关联字段,发布者
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //关联字段,评论列表
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});