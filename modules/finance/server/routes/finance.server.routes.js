'use strict';

module.exports = function (app) {
    var exchange = require('../controllers/exchange.server.controller');
    
    app.route('/api/exchange/:cur0/:cur1').get(exchange.read);
};