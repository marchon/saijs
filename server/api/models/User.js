var bcrypt = require('bcrypt-nodejs');
var auth = require('../services/auth');

/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        firstName: {
            type: 'STRING',
            required: true
        },
        lastName: {
            type: 'STRING',
            required: true
        },
        username: {
            type: 'EMAIL', // Email type will get validated by the ORM
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        },
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        },
        toJSON: function () {
            var obj = this.toObject();
            // Remove the password object value
            delete obj.password;
            //delete obj.verify_password;
            // return the new object without password
            return obj;
        }
    },
    beforeCreate: function (user, cb) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function () {
            }, function (err, hash) {
                if (err) {
                    cb(err);
                } else {
                    user.password = hash;
                    cb(null, user);
                }
            });
        });
    }
};
