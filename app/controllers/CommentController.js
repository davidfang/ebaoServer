function CommentController() {
    const Comment = require('../models/Comment');
    const User = require('../models/User');
    const Good = require('../models/Good');
    const Promise = require('bluebird');

    this.getByUserIdAndGoodId = function (req, res) {
        const {userId, goodId} = req.params;

        Comment.findOne({
            commentator: userId,
            goodId: goodId
        }).populate(['commentator', 'goodId']).then((comment) => {
            if (comment) {
                res.send({
                    status: true,
                    result: comment
                });
            } else {
                res.send({
                    status: false,
                    result: null
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

                let commentJson = {
                    isUp: isUp,
                    commentator: user._id,
                    goodId: good._id
                };
                if (content) {
                    commentJson.content = [{
                        body: content
                    }];
                }

                return new Comment(commentJson).save();
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
        });
    };
    
    this.update = function (req, res) {
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

                return Comment.findOne({
                    commentator: userId,
                    goodId: goodId
                });
            } else {
                res.send({
                    status: false
                });

                return Promise.reject();
            }
        }).then((commentHasSaved) => {
            if (commentHasSaved) {
                comment = commentHasSaved;

                let commentJson = {
                    isUp: isUp
                };
                if (content) {
                    commentHasSaved.content.push({
                        body: content
                    });
                    commentJson.content = commentHasSaved.content;
                }

                return Comment.update({
                    _id: commentHasSaved._id
                }, commentJson);
            } else {
                res.send({
                    status: false
                });

                return Promise.reject();
            }
        }).then((newComment) => {
            if (newComment) {
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

    return this;
}

module.exports = new CommentController();