const mongoose = require('../../db').mongoose;
mongoose.Promise = require('bluebird');
const commentSchema = require('../../schema/CommentSchema');

module.exports = mongoose.model('Comment', commentSchema);