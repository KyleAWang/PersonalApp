/**
 * Created by Kyle on 11/23/2016.
 */
'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('mongoose').model('User');


module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, done) {
        User.findOne({
            username: username.toLowerCase()
        }, function (err, user) {
            if (err){
                return done(err);
            }
            if (!user || !user.authenticate(password)){
                return done(null, false, {
                    message: 'Invalid username or password'
                });
            }
            return done(null, user);
        });
    }
    ));
    
};

 
