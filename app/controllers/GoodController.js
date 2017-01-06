function GoodController() {
    var Good = require('../../schema/GoodSchema');
    var MailService = require('../services/MailService');

    this.getGoods = function (req, res) {
        MailService.sendMail('1', '770619764@qq.com');

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

    this.createGood = function (req, res) {
        var body = JSON.parse(req.body);
        var title = body.title;
        var desc = body.desc;
        var url = body.url;
        var price = body.price;

        Good.create({
            title: title,
            desc: desc,
            url: url,
            price: price
        }, function (error, result) {
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

    return this;
}

module.exports = new GoodController();