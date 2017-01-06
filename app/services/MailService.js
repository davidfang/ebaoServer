"use strict";
const mailer = require('nodemailer');

const smtpTransport = mailer.createTransport("SMTP",{
    host: "smtp.yeah.net",
    secure: true,
    port: 25,
    auth: {
        user: "fdjiangwu@yeah.net",
        pass: "199128441jw"
    }
});

module.exports.sendMail = function (userId, mailAddress) {
    let verifyCode = '';
    for (let i = 0; i < 6; i++) {
        verifyCode += Math.floor(Math.random() * 10);
    }

    const mailOptions = {
        from: "fdjiangwu <fdjiangwu@yeah.net>",
        to: mailAddress,
        subject: "验证码 from ebao",
        html: "您好!您的验证码是<b>" + verifyCode + "</b>,请妥善保管!"
    };

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
            //验证码存存数据库操作
        }
        
        smtpTransport.close();
    });
};
