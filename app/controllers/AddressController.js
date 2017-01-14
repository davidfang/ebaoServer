function AddressController() {
    const Address = require('../models/Address');
    const User = require('../models/User');
    const Promise = require('bluebird');

    this.addAddress = function (req, res) {
        const userId = req.params.userId;
        const name = req.params.name;
        const telephone = req.params.telephone;
        const area = req.params.area;
        const detail = req.params.detail;
        const isDefault = req.params.isDefault;
        const address = area.join('') + detail;
        let na = {};

        Address.findOne({
            name: name,
            telephone: telephone,
            address: address
        }).then((addressHasSaved) => {
            if (addressHasSaved) {
                res.send({
                    status: false,
                    result: addressHasSaved
                });

                return Promise.reject();
            }

            return new Address({
                name: name,
                telephone: telephone,
                area: area,
                detail: detail,
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