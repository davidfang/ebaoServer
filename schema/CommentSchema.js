const mongoose = require('../db').mongoose;

module.exports = new mongoose.Schema({
    isUp: {
        type: Boolean,
        default: false
    },
    content: [
        {
            body: {
                type: String,
                default: ''
            },
            time: {
                type: Date,
                default: new Date()
            }
        }
    ],

    //关联字段,评论者
    commentator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //关联字段,宝贝Id
    goodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Good'
    }
});