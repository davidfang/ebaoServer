function AddressController() {
    const Address = require('../models/Address');
    const User = require('../models/User');
    const Promise = require('bluebird');

    this.getAddresses = function (req, res) {
        Address.find(req.params).then((addresses) => {
            if (addresses && addresses.length) {
                let sortedAddresses = [];
                for (let i = 0; i < addresses.length; i++) {
                    if (addresses[i].isDefault) {
                        sortedAddresses.unshift(addresses[i]);
                    } else {
                        sortedAddresses.push(addresses[i]);
                    }
                }

                res.send({
                    status: true,
                    result: sortedAddresses
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

    this.add = function (req, res) {
        const {userId, name, telephone, area, detail, isDefault} = JSON.parse(req.body);
        const address = area.join('') + detail;
        let na = {};

        new Address({
            name: name,
            telephone: telephone,
            area: area,
            detail: detail,
            address: address,
            isDefault: isDefault,
            userId: userId
        }).save().then((newAddress) => {
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
            res.send({
                status: false,
                result: error
            });
        })
    };

    this.update = function (req, res) {
        const {addressId, name, telephone, area, detail, isDefault, address} = JSON.parse(req.body);

        Address.findById(addressId).then((addressHasSaved) => {
            if (addressHasSaved) {
                return Address.update({
                    _id: addressId
                }, {
                    name: name,
                    telephone: telephone,
                    area: area,
                    detail: detail,
                    address: address,
                    isDefault: isDefault
                });
            } else {
                res.send({
                    status: false
                });

                Promise.reject();
            }
        }).then((addressHasUpdated) => {
            if (addressHasUpdated) {
                res.send({
                    status: true,
                    result: addressHasUpdated
                })
            } else {
                res.send({
                    status: false
                })
            }
        }).catch((error) => {
            res.send({
                status: false,
                result: error
            })
        })
    };

    return this;
}

module.exports = new AddressController();