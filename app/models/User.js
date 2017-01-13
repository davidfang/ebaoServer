const mongoose = require('../../db').mongoose;
mongoose.Promise = require('bluebird');
const userSchema = require('../../schema/UserSchema');

module.exports = mongoose.model('users', userSchema);