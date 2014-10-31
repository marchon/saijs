var passport = require("passport");
var jwt = require('jsonwebtoken');
var secret = 'ewfn09qu43f09qfj94qf*&H#(R';


module.exports = {
    login: function (req, res) {
        var token;
        passport.authenticate('local', function (err, user, info) {
            if ((err) || (!user)) {
                res.send({
                    success: false,
                    message: 'invalidPassword'
                });
                return;
            } else {
                if (err) {
                    res.send({
                        success: false,
                        message: 'unknownError',
                        error: err
                    });
                } else {

                    token = jwt.sign(user, secret, { expiresInMinutes: 60 * 24 });
                    // Set persistent cookie
                    req.session.cookie.token = token;
                    res.send({
                        success: true,
                        user: user[0],
                        token: token
                    });
                }
            }
        })(req, res);
    },
    isvalidtoken: function (req, res) {
        var token;
        if (req.headers.hasOwnProperty('authorization') && req.headers.authorization) {
            token = req.headers.authorization.replace("Bearer ", "");
        } else {
            return res.send({success: false});
        }
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) return res.send({success: false});
                if (decoded) {
                    return res.send({success: true, user: decoded[0]});
                }
            });
        } else {
            return res.send({success: false});
        }
    }
};