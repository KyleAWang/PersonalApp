/**
 * Created by Kyle on 7/24/2016.
 */
(function () {
    'use strict';
    
    angular.module('orders.services')
        .factory('OrdersService', OrdersService);

    OrdersService.$inject = ['$resource'];
    
    function OrdersService($resource) {
        return $resource('api/orders/:_id', {
            _id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }

}());
 
