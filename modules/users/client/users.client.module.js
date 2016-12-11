/**
 * Created by Kyle on 12/7/2016.
 */
(function (app) {
    'use strict';

    app.registerModule('users');
    app.registerModule('users.routes', ['ui.router', 'core.routes']);
    app.registerModule('users.services');

}(ApplicationConfiguration));
 
