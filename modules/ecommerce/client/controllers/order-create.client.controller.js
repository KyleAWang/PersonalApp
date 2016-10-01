(function () {
    'use strict';

    angular.module('orders.create')
        .controller('OrderCreateController', OrderCreateController);

    OrderCreateController.$inject = ['$scope', '$state', '$rootScope', 'currencyRate', '$stateParams', '$filter', 'OrdersService'];

    function OrderCreateController($scope, $state, $rootScope, currencyRate, $stateParams, $filter, OrdersService) {
        $scope.oneAtATime = false;
        $scope.status = {
            item_open: false,
            shipping_open: true,
            address_open: false,
            general_open: true
        };
        $scope.error;
        $scope.order = new OrdersService();
        $scope.orderCreate = orderCreate;
        $scope.order.shipping = [];
        $scope.order.items = [];
        $scope.SubmitBtn = 'Submit';
        $scope.shippingUrl = shippingUrl;
        var createdDate = $scope.order.created;
        console.log(createdDate);
        // $scope.order.created = $filter('date')($scope.order.created ? new Date($scope.order.created) : new Date(), 'yyyy-MM-dd hh:mm a');
        // $scope.order.totalCost = ($scope.order.shiping_fee ? $scope.order.shiping_fee : 0) + ($scope.order.local_fee ? $scope.order.local_fee : 0) + ($scope.order.subtotal ? $scope.order.subtotal : 0);
        // $scope.order.totalRmbCost = sumrmb();

        $scope.$watch('order.created', function (newValue) {
            $scope.order.created = $filter('date')(newValue? newValue: new Date(), 'yyyy-MM-dd hh:mm a');
        });

        $scope.$watch('vm.datetime', function () {
            console.log('watch:' + $scope.vm.datetime);
        });

        $scope.$on('emit:dateTimePicker', function (e, value) {
            $scope.order.created = value.dateTime;
            console.log('on:'+$scope.order.created);
        })

        function dateChange() {
            console.log($scope.order.created);
        }

        $scope.$watch('order.subtotal', function (newVal) {
            $scope.order.totalCost = sum();
            $scope.order.totalRmbCost = sumrmb();
        });
        $scope.$watch('order.shiping_fee', function (newVal) {
            $scope.order.totalCost = sum();
            $scope.order.totalRmbCost = sumrmb();
        });
        $scope.$watch('order.local_fee', function (newVal) {
            $scope.order.totalCost = sum();
            $scope.order.totalRmbCost = sumrmb();
        });


        $scope.shippingTemplates = [];
        $scope.addShipping = function () {
            $scope.shippingTemplates.push('shipping_temp');
        };
        $scope.removeShipping = function () {
            $scope.shippingTemplates.pop('shipping_temp');
        };

        $scope.itemTemplates = [];
        $scope.addItem = function () {
            $scope.itemTemplates.push('item_temp');
        };
        $scope.removeItem = function () {
            $scope.itemTemplates.pop('item_temp');
        };


        console.log($stateParams.order);
        if ($stateParams.order) {
            $scope.SubmitBtn = "Update";
            $scope.order = $stateParams.order;
            if ($scope.order.shipping && $scope.order.shipping.length > 0) {
                for (var i = 0; i < $scope.order.shipping.length; i++) {
                    $scope.addShipping();
                }
            }
            if ($scope.order.items && $scope.order.items.length > 0) {
                for (var i = 0; i < $scope.order.items.length; i++) {
                    $scope.addItem();
                }
            }
        }

        function shippingUrl(index) {
            var sno = $scope.order.shipping[index].no;
            if (sno && sno.toUpperCase().substr(0, 4) === 'EF10'){
                $scope.order.shipping[index].url='http://www.efspost.com/tool/track?s='+sno;
            }else {
                $scope.order.shipping[index].url='http://member.efspost.net/cgi-bin/GInfo.dll?EmmisTrack?cno='+sno;
            }
        }


        function sum() {
            return ($scope.order.shiping_fee ? $scope.order.shiping_fee : 0) + ($scope.order.local_fee ? $scope.order.local_fee : 0) + ($scope.order.subtotal ? $scope.order.subtotal : 0);
        };
        function sumrmb() {
            var rate = currencyRate.value ? currencyRate.value : 4.85;
            rate = Math.ceil(rate * 10) / 10;
            $scope.rate = currencyRate.value + '~' + rate;
            var total = ($scope.order.shiping_fee ? $scope.order.shiping_fee : 0) + ($scope.order.local_fee ? $scope.order.local_fee : 0) + ($scope.order.subtotal ? $scope.order.subtotal : 0);
            return Math.ceil(rate * total * 100) / 100;
        };


        function orderCreate(isValid) {
            $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', '$scope.orderCreateForm')
                return false;
            }
            console.log($scope.order);
            if ($scope.order._id) {
                $scope.order.$update(function (response) {
                    console.log(response);
                    $state.go('order-list');
                }, function (err) {
                    $scope.error = response.message;
                });

            } else {
                $scope.order.$save(function (response) {
                    console.log(response);
                    $state.go('order-list');
                }, function (response) {
                    $scope.error = response;
                });


            }
        }


    }



}());