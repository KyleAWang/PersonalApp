/**
 * Created by Kyle on 12/11/2016.
 */
(function () {
    'use strict';

    angular.module('orders.services')
        .factory('OrdersIScrollService', OrdersIScrollService);
    angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250);

    OrdersIScrollService.$inject = ['OrdersService'];

    function OrdersIScrollService(OrdersService) {
        var IScrollOrders = function () {
            this.items = [];
            this.busy = false;
            this.after = '';
            this.pageno = 1;
            this.offset = 10;
        };


        IScrollOrders.prototype.nextPage = function () {
            if (this.busy) return;
            this.busy = true;
            console.log(this.pageno);
            if (this.pageno > 20){
                return;
            }
            OrdersService.query({offset: this.offset, pageno: this.pageno}).$promise.then(function (response) {
                var orders = response;
                if (orders && orders.length > 0) {
                    for (var i = 0; i < orders.length; i++) {
                        orders[i].created = new Date(orders[i].created);
                        this.items.push(orders[i]);
                    }
                    this.pageno++;
                    this.busy = false;
                }
            }.bind(this), function (err) {
                console.log(err);
            });

        };

        return IScrollOrders;
    }

}());
 
