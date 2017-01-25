function OrderController() {
    const Order = require('../models/Order');

    this.add = function (req, res) {
        const {userId, goods} = JSON.parse(req.body);

        new Order({
            buyer: userId,
            goods: goods
        }).save().then((newOrder) => {
            if (newOrder) {
                res.send({
                    status: true,
                    result: newOrder
                });
            } else {
                res.send({
                    status: false
                });
            }
        }).catch((error) => {
            res.send({
                status: false,
                resule: error
            })
        })
    };

    return this;
}

module.exports = new OrderController();