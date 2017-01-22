function CartController() {
    const Cart = require('../models/Cart');
    const User = require('../models/User');
    const Good = require('../models/Good');
    const Promise = require('bluebird');

    this.getByUserIdAndGoodId = function (req, res) {
        const {userId, goodId} = req.params;

        Cart.findOne({
            buyer: userId,
            goodId: goodId
        }).then((cart) => {
            if (cart) {
                res.send({
                    status: true,
                    result: cart
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

    this.getAllByUserId = function (req, res) {
        const {userId} = req.params;

        Cart.find({
            buyer: userId
        }).populate(['buyer', 'goodId']).then((carts) => {
            if (carts && carts.length) {
                res.send({
                    status: true,
                    result: carts
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
        const {userId, goodId, count} = JSON.parse(req.body);
        let user = null, good = null;

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

                return new Cart({
                    count: count,
                    buyer: userId,
                    goodId: goodId
                }).save();
            } else {
                res.send({
                    status: false
                });

                return Promise.reject();
            }
        }).then((newCart) => {
            if (newCart) {
                res.send({
                    status: true,
                    result: {
                        user: user,
                        good: good,
                        cart: newCart
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
        const {userId, goodId, count} = JSON.parse(req.body);
        let user = null, good = null;

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

                return Cart.update({
                    buyer: userId,
                    goodId: goodId
                }, {
                    count: count
                });
            } else {
                res.send({
                    status: false,
                    result: null
                });

                return Promise.reject();
            }
        }).then((newCart) => {
            if (newCart) {
                res.send({
                    status: true,
                    result: {
                        user: user,
                        good: good,
                        cart: newCart
                    }
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
        })
    };

    return this;
}

module.exports = new CartController();