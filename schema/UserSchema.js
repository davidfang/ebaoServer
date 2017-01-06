module.exports = (function () {
    const mongoose = require('../db').mongoose;
    mongoose.Promise = require('bluebird');
    const schema = {
        mail: {
            unique: true,
            type: String
        },
        username: {
            unique: true,
            type: String
        },
        password: String,
        avatar: String,
        gender: String,
        verifyCode: String
    };

    const collectionName = 'users';
    const UserSchema = mongoose.Schema(schema);

    return mongoose.model(collectionName, UserSchema);
})();