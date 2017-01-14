function UserController() {
    const User = require('../models/User');
    const MailService = require('../services/MailService');
    const Promise = require('bluebird');

    this.getUserByName = function (req, res) {
        let username = req.params.username;

        User.findOne({
            username: username
        }).populate('addresses').then((user) => {
            if (user) {
                res.send({
                    status: true,
                    result: user
                });
            } else {
                res.send({
                    status: false
                });
            }
        })
    };

    this.getUserByMail = function (req, res) {
        let address = req.params.address;

        User.findOne({
            mail: address
        }).then((user) => {
            if (user) {
                res.send({
                    status: true,
                    result: user
                });
            } else {
                res.send({
                    status: false
                });
            }
        })
    };

    this.getUser = function (req, res) {
        User.findOne(req.params).populate('addresses').then((user) => {
            if (user) {
                res.send({
                    status: true,
                    result: user
                });
            } else {
                res.send({
                    status: false
                })
            }
        });
    };

    this.sendVerifyCode = function (req, res) {
        const mail = req.params.mail;

        MailService.sendEmail(mail).then((verifyCode) => {
            res.send({
                status: true,
                result: verifyCode
            });
        }).catch((error) => {
            res.send({
                status: false,
                result: error
            });
        });
    };

    this.register = function (req, res) {
        const mail = req.body.mail;
        const username = req.body.username;

        User.find().where('mail', mail).or([{username: username}]).then((userInfo) => {
            if (userInfo && userInfo.length) {
                res.send({
                    status: false,
                    result: "该邮箱或用户名已经被注册"
                });
                return Promise.reject();
            }

            return new User(req.body).save();
        }).then((newUserInfo) => {
            if (newUserInfo) {
                res.send({
                    status: true,
                    result: newUserInfo
                })
            }
        }).catch((error) => {
            return res.send({
                status: false,
                error: error
            });
        });
    };

    this.updatePassword = function (req, res) {
        const params = JSON.parse(req.body);
        const userId = params.userId;
        const password = params.password;

        User.findByIdAndUpdate(userId, {
            password: password
        }).then((user) => {
            if (user) {
                res.send({
                    status: true,
                    result: user
                })
            } else {
                res.send({
                    status: false
                })
            }
        }).catch((error) => {
            res.send({
                status: false,
                error: error
            })
        });
    };

    this.updateAvatar = function (req, res) {
        const params = JSON.parse(req.body);
        const userId = params.userId;
        const avatar = params.avatar;

        User.findByIdAndUpdate(userId, {
            avatar: avatar
        }).then((user) => {
            if (user) {
                res.send({
                    status: true,
                    result: user
                })
            } else {
                res.send({
                    status: false
                })
            }
        }).catch((error) => {
            res.send({
                status: false,
                error: error
            })
        });
    };

    this.updateGender = function (req, res) {
        const params = JSON.parse(req.body);
        const userId = params.userId;
        const gender = params.gender;

        User.findByIdAndUpdate(userId, {
            gender: gender
        }).then((user) => {
            if (user) {
                res.send({
                    status: true,
                    result: user
                })
            } else {
                res.send({
                    status: false
                })
            }
        }).catch((error) => {
            res.send({
                status: false,
                error: error
            })
        });
    };

    return this;
}

module.exports = new UserController();