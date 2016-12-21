/**
 * Created by Kyle on 7/7/2016.
 */
(function () {
    'use strict';

    angular.module('orders.list')
        .controller('OrdersController', OrdersController);
    OrdersController.$inject = ['$scope', '$state', '$http', 'OrdersService', 'OrdersIScrollService'];

    function OrdersController($scope, $state, $http, OrdersService, OrdersIScrollService) {
        var vm = this;
        vm.orders = [];
        vm.currentOrd = {};
        vm.fillAOrder = fillAOrder;
        vm.removeOrder = removeOrder;

        vm.ordersIScroll = new OrdersIScrollService();

        $scope.status = {
            item_open: false,
            shipping_open: true,
            address_open: false,
            general_open: true
        };

        // getOrders();

        function getOrders() {
            OrdersService.query({offset: 10, pageno:2}).$promise.then(function (response) {
                vm.orders = response;
                if (vm.orders){
                    for(var i = 0; i< vm.orders.length; i++){
                        vm.orders[i].created = new Date(vm.orders[i].created);
                    }
                }
            }, function (err) {
                console.log(err.data.message);
            });

        }

        function removeOrder(_id) {
            if(confirm('Are you sure?')){
                if (_id) {
                    OrdersService.remove({_id: _id}).$promise.then(function (response) {
                        console.log(response);
                        $state.reload();
                    }, function (response) {
                        console.log(response.message);
                    });
                }
            }
        }

        function fillAOrder(orderId) {
            console.log(vm.orders);
            var order = {};
            if (orderId) {
                order = getAOrder(orderId);
                $state.go('order-create', {order: order});
            }
        }

        function getAOrder(orderId) {
            if (vm.orders) {
                for (var i = 0; i < vm.orders.length; i++) {
                    if (vm.orders[i].orderId === orderId) {
                        return vm.orders[i];
                    }
                }
            }
            return null;
        }

    }


}());
 
