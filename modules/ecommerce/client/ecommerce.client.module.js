/**
 * Created by Kyle on 7/4/2016.
 */
(function (app) {
    'use strict';

    app.registerModule('orders.create', ['core']);
    app.registerModule('orders.route', ['ui.router']);
    app.registerModule('orders.services');
    app.registerModule('orders.list', [ 'infinite-scroll']);
}(ApplicationConfiguration));
 
