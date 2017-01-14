function GoodController() {
    var Good = require('../models/Good');

    this.getGoods = function (req, res) {
        Good.find({}, function (error, result) {
            if (error) {
                return res.send({
                    'error': error,
                    'status': false
                });
            }
            else {
                return res.send({
                    'result': result,
                    'status': true
                });
            }
        });
    };

    this.addGood = function (req, res) {
        new Good(JSON.parse(req.body)).save().then((newGood) => {
            if (newGood) {
                res.send({
                    status: true,
                    result: newGood
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

module.exports = new GoodController();