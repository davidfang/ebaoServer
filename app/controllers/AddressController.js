function AddressController() {
    const Address = require('../models/Address');
    const User = require('../models/User');
    const Promise = require('bluebird');

    this.addAddress = function (req, res) {
        const userId = req.params.userId;
        const name = req.params.name;
        const telephone = req.params.telephone;
        const address = req.params.address;
        const isDefault = req.params.isDefault;

        let na = {};

        Address.findOne({
            name: name,
            telephone: telephone,
            address: address
        }).then((user) => {
            if (user) {
                res.send({
                    status: false,
                    result: user
                });

                return Promise.reject();
            }

            return new Address({
                name: name,
                telephone: telephone,
                address: address,
                isDefault: isDefault
            }).save();
        }).then((newAddress) => {
            na = newAddress;
            if (newAddress) {
                res.send({
                    status: true,
                    result: newAddress
                });

                console.log('userId', userId);
                
                return User.findById(userId);
            } else {
                res.send({
                    status: false
                });

                return Promise.reject();
            }
        }).then((user) => {
            let addresses = [];
            if (!user.addresses) {
                addresses = [na._id];
            } else {
                addresses = user.addresses.push(na._id);
            }

            console.log(addresses);

            if (user) {
                return User.update({
                    _id: user._id
                }, {
                    addresses: addresses
                });
            }
        }).then((newUser) => {
            console.log(newUser);
        }).catch((error) => {

        })
    };

    return this;
}

module.exports = new AddressController();