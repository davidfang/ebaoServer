function CommentController() {
    const Comment = require('../models/Comment');
    const User = require('../models/User');
    const Good = require('../models/Good');
    const Promise = require('bluebird');

    this.getByGoodId = function (req, res) {
        const {goodId} = req.params;

        Comment.find({
            goodId: goodId
        }).populate(['commentator', 'goodId']).then((comments) => {
            if (comments && comments.length) {
                res.send({
                    status: true,
                    result: comments
                });
            } else {
                res.send({
                    status: false
                });
            }
        }).catch((error) => {
            res.send({
                status: false,
                result: error
            });
        });
    };

    this.add = function (req, res) {
        const {isUp, content, userId, goodId} = req.params;
        let user = null, good = null, comment = null;

        User.findOne({
            _id: userId
        }).then((userHasSaved) => {
            if (userHasSaved) {
                user = userHasSaved;

                return Good.findOne({
                    _id: goodId
                });
            } else {
                res.send({
                    status: false
                });

                return Promise.reject();
            }
        }).then((goodHasSaved) => {
            if (goodHasSaved) {
                good = goodHasSaved;

                return new Comment({
                    isUp: isUp,
                    content: content,
                    commentator: user._id,
                    goodId: good._id
                }).save();
            } else {
                res.send({
                    status: false
                });

                return Promise.reject();
            }
        }).then((newComment) => {
            if (newComment) {
                comment = newComment;
                good.comments.push(newComment._id);

                return Good.update({
                    _id: good._id
                }, {
                    comments: good.comments
                })
            } else {
                res.send({
                    status: false
                });

                return Promise.reject();
            }
        }).then((newGood) => {
            if (newGood) {
                res.send({
                    status: true,
                    result: {
                        comment: comment,
                        user: user,
                        good: good
                    }
                });
            } else {
                res.send({
                    status: false
                });
            }
        }).catch((error) => {
            res.send({
                status: false,
                result: error
            });
        })
    };
    
    this.update = function (req, res) {

    };

    return this;
}

module.exports = new CommentController();