/**
 * Created by Kyle on 7/3/2016.
 */
(function () {
    'use strict';

    angular.module('core')
        .controller('HomeController', HomeController)
        .value('currencyRate', {
            value: 4.8
        });

    HomeController.$inject = ['$http', '$rootScope', 'currencyRate'];

    function HomeController($http, $rootScope, currencyRate) {
        var vm = this;
        vm.xChangeText = 'Loading...';
        vm.init = init;

        init();

        function init(){
            vm.xChangeText = 'Loading...';
            console.log(currencyRate);
            $http.get('/api/exchange/NZD/CNY').success(function (response) {
                vm.xChangeText = response.Name + ':' + response.Rate + '  ' + response.Time + ' ' + response.Date ;
                currencyRate.value = response.Rate;
            }).error(function (response) {
                console.log(response);
            })
        }
    }

}());
 
