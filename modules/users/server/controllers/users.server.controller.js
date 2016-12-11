/**
 * Created by Kyle on 12/4/2016.
 */
'use strict';

 var _ = require('lodash');

module.exports = _.extend(
    require('./users/users.authentication.server.controller'),
    require('./users/users.authorization.server.controller')
);
