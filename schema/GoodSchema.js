const mongoose = require('../db').mongoose;

module.exports = new mongoose.Schema({
    title: String,
    desc: String,
    url: String,
    price: String
});