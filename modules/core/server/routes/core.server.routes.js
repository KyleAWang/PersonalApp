'use strict';

var path = require('path');

module.exports = function (app) {
    var core = require('../controllers/core.server.controller');
    
    app.route('/server-error').get(core.renderServerError);
    
    app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

    var xchange = require(path.resolve('./modules/finance/server/controllers/exchange.server.controller'));
    app.use('/*', xchange.getXchange);
    app.route('/*').get(core.renderIndex);
};