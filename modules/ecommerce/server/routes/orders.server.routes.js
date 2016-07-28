'use strict';

module.exports = function (app) {
    var orders = require('../controllers/orders.server.controller');
    
    app.route('/api/orders')
        .get(orders.list)
        .post(orders.create);
    
    app.route('/api/orders/:_id')
        .delete(orders.delete)
        .put(orders.update);
};