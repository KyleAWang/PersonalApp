/**
 * Created by Kyle on 7/2/2016.
 */
(function (window) {
    'use strict';
    var applicationModuleName = 'KyleTools';
    var service = {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: ['ngResource', 'ngMessages', 'ui.router', 'ui.bootstrap'],
        registerModule: registerModule
    };
    window.ApplicationConfiguration = service;
    function registerModule(moduleName, dependencies) {
        angular.module(moduleName, dependencies || []);
        angular.module(applicationModuleName).requires.push(moduleName);
    }
}(window));
//# sourceMappingURL=config.js.map