/**
 * Created by Kyle on 7/2/2016.
 */
(function () {
    'use strict';

    angular
        .module('core')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$state'];

    function HeaderController($scope, $state) {
        var vm = this;

        // vm.accountMenu = menuService.getMenu('account').items[0];
        // vm.authentication = Authentication;
        vm.isCollapsed = false;
        // vm.menu = menuService.getMenu('topbar');

        $scope.$on('$stateChangeSuccess', stateChangeSuccess);

        function stateChangeSuccess() {
            // Collapsing the menu after navigation
            vm.isCollapsed = false;
        }
    }
}());
 
