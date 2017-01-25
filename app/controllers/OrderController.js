function OrderController() {
    const Order = require('../models/Order');

    this.add = function (req, res) {
        const {userId, goods} = req.params;

        console.log(userId, goods);

        // new Order({
        //     buyer: userId,
        //     goodIds: goodIds
        // }).save().then((newOrder) => {
        //     if (newOrder) {
        //
        //     }
        // })
    };

    return this;
}

module.exports = new OrderController();