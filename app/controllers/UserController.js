function UserController() {
    const User = require('../../schema/UserSchema');
    const MailService = require('../services/MailService');

    this.getUserByName = function (req, res) {
        let username = req.params.username;

        User.findOne({
            username: username
        }).then((data) => {
            if (data) {
                res.send({
                    status: true,
                    result: data
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
        }).then((data) => {
            if (data) {
                res.send({
                    status: true,
                    result: data
                });
            } else {
                res.send({
                    status: false
                });
            }
        })
    };

    this.getUser = function (req, res) {
        User.findOne(req.params).then((user) => {
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
        });
    };

    this.register = function (req, res) {
        const params = JSON.parse(req.body);
        const mail = params.mail;
        const username = params.username;
        
        User.find().where('mail', mail).or([{username: username}]).then((userInfo) => {
            if (userInfo && userInfo.length) {
                res.send({
                    status: false,
                    result: "该邮箱或用户名已经被注册"
                });
                return;
            }

            return new User(params).save();
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
        }).then((data) => {
            if (data) {
                res.send({
                    status: true,
                    result: data
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
        }).then((data) => {
            if (data) {
                res.send({
                    status: true,
                    result: data
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
        }).then((data) => {
            console.log(data);
            if (data) {
                res.send({
                    status: true,
                    result: data
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