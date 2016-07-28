/**
 * Created by Kyle on 7/26/2016.
 */
(function () {
    var dateTimePicker = function ($rootScope, $filter) {
        return {
            require: '?ngModel',
            restrict: 'AE',
            scope: {
                pick12HourFormat: '@',
                language: '@',
                useCurrent: '@',
                location: '@'
            },
            link: function (scope, elem, attrs) {
                elem.datetimepicker({
                    pick12HourFormat: scope.pick12HourFormat,
                    language: scope.language,
                    useCurrent: scope.useCurrent
                });

                //Local event change
                elem.on('blur', function () {

                    // console.info('this', this);
                    // console.info('scope', scope);
                    // console.info('attrs', attrs);
                    scope.dateTime = $filter('date')( elem.val()?new Date(elem.val()): new Date(), 'yyyy-MM-dd hh:mm a');
                    // scope.dateTime = new Date(elem.val());
                    // console.log(elem.val());

                    $rootScope.$broadcast('emit:dateTimePicker', {
                        dateTime: scope.dateTime,
                    });


                    /*// returns moments.js format object
                     scope.dateTime = new Date(elem.data("DateTimePicker").getDate().format());
                     // Global change propagation

                     $rootScope.$broadcast("emit:dateTimePicker", {
                     location: scope.location,
                     action: 'changed',
                     dateTime: scope.dateTime,
                     example: scope.useCurrent
                     });
                     scope.$apply();*/
                })
            }
        };
    };

    angular.module('orders.create')
        .directive('dateTimePicker', dateTimePicker);
})();

 
