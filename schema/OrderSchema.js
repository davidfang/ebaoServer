const mongoose = require('../db').mongoose;

module.exports = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    goods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Good'
        }
    ]
});