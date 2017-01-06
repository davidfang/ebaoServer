function UserController() {
    const User = require('../../schema/UserSchema');

    this.checkRegisterInfo = function (req, res) {
        const mail = req.params.mail;
        const username = req.params.username;

        console.log('mail', mail);

        if (mail) {
            User.findOne({
                mail: mail
            }).then((userInfo) => {
                if (userInfo) {
                    res.send({
                        status: false,
                        result: "该邮箱已经被注册"
                    });
                } else {
                    res.send({
                        status: true,
                        result: "邮箱可用"
                    });
                }
            }).catch((error) => {
                return res.send({
                    status: false,
                    error: error
                });
            });
        }

        if (username) {
            User.findOne({
                username: username
            }).then((userInfo) => {
                if (userInfo) {
                    res.send({
                        status: false,
                        result: "该用户名已经被注册"
                    });
                } else {
                    res.send({
                        status: true,
                        result: "用户名可用"
                    });
                }
            }).catch((error) => {
                return res.send({
                    status: false,
                    error: error
                });
            });
        }
    };

    this.register = function (req, res) {
        const mail = req.params.mail;
        const username = req.params.username;
        const password = req.params.password;
        const verifyCode = req.params.verifyCode;

        User.find().where('mail', mail).or([{username: username}]).then((userInfo) => {
            if (userInfo) {
                res.send({
                    status: false,
                    result: "该邮箱或用户名已经被注册"
                });
                return;
            }

            const user = new User({
                mail: mail,
                username: username,
                password: password,
                verifyCode: verifyCode
            });
            return user.save();
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

    return this;
}

module.exports = new UserController();