/**
 * Created by Kyle on 12/10/2016.
 */
'use strict';

var acl = require('acl');

acl = new acl(new acl.memoryBackend());


exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['user'],
        allows: [{
            resources: '/api/orders',
            permissions: '*'
        },{
            resources: '/api/orders/:_id',
            permissions: '*'
        }]
    }]);
};

exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles: ['guest'];

    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
        if (err){
            return res.status(500).send('Unexpected authorization err');
        }else{
            if (isAllowed){
                return next();
            }else{
                return res.status(403).json({
                    message: 'User is not authorized'
                });
            }
        }
    });
};