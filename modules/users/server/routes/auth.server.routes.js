/**
 * Created by Kyle on 12/1/2016.
 */

var passport = require('passport');

module.exports = function (app) {
    var users = require('../controllers/users.server.controller');
    
    app.route('/api/auth/signup').post(users.signup);
    app.route('/api/auth/signin').post(users.signin);
    app.route('/api/auth/signout').get(users.signout);

};
