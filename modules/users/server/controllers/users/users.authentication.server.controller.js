/**
 * Created by Kyle on 12/1/2016.
 */

var path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

var noReturnUrls = [
    '/authentication/signin',
    '/authentication/signup'
];
 

exports.signup = function (req, res) {
    delete req.body.roles;
    
    var user = new User(req.body);
    user.provider = 'local';
    user.displayName = user.firstName + ' ' + user.lastName;

    user.save(function (err) {
        if(err){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }else{
            user.password = undefined;
            user.salt = undefined;

            req.login(user, function (err) {
                if (err){
                    res.status(400).send(err);
                }else{
                    res.json(user);
                }
            });
        }
    });
};

exports.signin = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err || !user){
            res.status(400).send(info);
        }else{
            user.password = undefined;
            user.salt = undefined;

            req.login(user, function (err) {
                if (err){
                    req.status(400).send(err);
                }else{
                    res.json(user);
                }
            });
        }
    })(req, res, next);
};

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};