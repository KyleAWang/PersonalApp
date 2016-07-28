/**
 * Created by Kyle on 7/4/2016.
 */
(function () {
    'use strict';
    
    angular.module('orders.route')
        .config(routeConfig);
    
    routeConfig.$inject = ['$stateProvider'];
    
    function routeConfig($stateProvider) {
        $stateProvider
            .state('order-create', {
                url: '/order/create',
                params:{
                    order: null
                },
                templateUrl: 'modules/ecommerce/client/views/order-create.client.view.html',
                controller: 'OrderCreateController',
                controllerAs: 'vm',
            })
            .state('order-list', {
                url: '/orders/list',
                templateUrl: 'modules/ecommerce/client/views/orders.client.view.html',
                controller: 'OrdersController',
                controllerAs: 'vm'
            });
    }
}());
 
