function GoodController() {
    const Good = require('../models/Good');
    const User = require('../models/User');
    const Promise = require('bluebird');

    this.getGoods = function (req, res) {
        Good.find({}).populate('publisher').then((goods) => {
            if (goods) {
                res.send({
                    status: true,
                    result: goods
                });
            } else {
                res.send({
                    status: false
                })
            }
        });
    };

    this.addGood = function (req, res) {
        const body = JSON.parse(req.body);
        const title = body.title;
        const desc = body.desc;
        const url = body.url;
        const price = body.price;
        const publisher = body.publisher;

        User.findOne({
            _id: publisher
        }).then((user) => {
            if (user) {
                return new Good({
                    title: title,
                    desc: desc,
                    url: url,
                    price: price,
                    publisher: user._id
                }).save();
            } else {
                res.send({
                    status: false
                });

                return Promise.reject();
            }
        }).then((newGood) => {
            if (newGood) {
                console.log('newGood', newGood);
                res.send({
                    status: true,
                    result: newGood
                });
            }
        }).catch((error) => {
            res.send({
                status: false,
                result: error
            })
        });
    };

    return this;
}

module.exports = new GoodController();