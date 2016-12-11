'use strict';

module.exports = function (app) {
    var orders = require('../controllers/orders.server.controller'),
        ecommercePolicy = require('../policies/ecommerce.server.policy');
    
    app.route('/api/orders').all(ecommercePolicy.isAllowed)
        .get(orders.list)
        .post(orders.create);
    
    app.route('/api/orders/:_id').all(ecommercePolicy.isAllowed)
        .delete(orders.delete)
        .put(orders.update);
};