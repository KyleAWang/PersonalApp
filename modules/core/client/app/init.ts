/**
 * Created by Kyle on 7/2/2016.
 */
(function (app) {
    'use strict';

    angular.module(app.applicationModuleName, app.applicationModuleVendorDependencies);
    
    angular.module(app.applicationModuleName)
        .config(bootstrapConfig);


    bootstrapConfig.$inject = ['$locationProvider', '$httpProvider'];

    function bootstrapConfig($locationProvider, $httpProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
    }

    angular.element(document).ready(init);

    function init() {
        // Fixing facebook bug with redirect
        if (window.location.hash && window.location.hash === '#_=_') {
            if (window.history && history.pushState) {
                window.history.pushState('', document.title, window.location.pathname);
            } else {
                // Prevent scrolling by storing the page's current scroll offset
                var scroll = {
                    top: document.body.scrollTop,
                    left: document.body.scrollLeft
                };
                window.location.hash = '';
                // Restore the scroll offset, should be flicker free
                document.body.scrollTop = scroll.top;
                document.body.scrollLeft = scroll.left;
            }
        }

        angular.bootstrap(document, [app.applicationModuleName]);
    }

}(ApplicationConfiguration));
 
