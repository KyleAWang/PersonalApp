'use strict';

var path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    request = require('request'),
    logger = require(path.resolve('./config/lib/logger'));

exports.read = function (req, res) {
    var cur0 = req.params.cur0;
    var cur1 = req.params.cur1;
    var q = 'NZDCNY';
    if (cur0 && cur0 !== '' && cur1 && cur1 !== ''){
        q = cur0.toUpperCase() + cur1.toUpperCase();
    }
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22'+q+'%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

    request.get(url, {timeout: 3000}, function (err, response, body) {
        if (err){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }else{
            var resjson = JSON.parse(body);
            if (resjson.query&&resjson.query.results && resjson.query.results.rate){
                var data = resjson.query.results.rate;
                logger.info(data);
                res.json(data);
            }else{
                return res.status(404).send({
                    message: 'No exchange rate on: ' + q
                });
            }
        }
    })
};

exports.getXchange = function (req, res, next) {
    var cur0 = req.params.cur0;
    var cur1 = req.params.cur1;
    var q = 'NZDCNY';
    if (cur0 && cur0 !== '' && cur1 && cur1 !== ''){
        q = cur0.toUpperCase() + cur1.toUpperCase();
    }
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22'+q+'%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    res.locals.papp_xerror = '';
    res.locals.papp_xchange = '';
    request.get(url, {timeout: 3000}, function (err, response, body) {
        if (err){
            res.locals.papp_xerror = errorHandler.getErrorMessage(err);
        }else{
            // console.log(body);
            var resjson = JSON.parse(body);
            if (resjson.query&&resjson.query.results && resjson.query.results.rate){
                var data = resjson.query.results.rate;
                logger.info(data);
                res.locals.papp_xchange = JSON.stringify(data);
            }else{
                res.locals.papp_xerror = 'No exchange rate on: ' + q;
            }
        }
        next();
    })
};