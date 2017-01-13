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
        }).then((address) => {
            if (address) {
                res.send({
                    status: false,
                    result: address
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
            if (newAddress) {
                na = newAddress;
                return User.findById(userId);
            } else {
                res.send({
                    status: false
                });

                return Promise.reject();
            }
        }).then((user) => {
            user.addresses.push(na._id);

            return User.update({
                _id: user._id
            }, {
                addresses: user.addresses
            });
        }).then((newUser) => {
            res.send({
                status: true,
                result: {
                    address: na,
                    user: newUser
                }
            });
        }).catch((error) => {

        })
    };

    return this;
}

module.exports = new AddressController();