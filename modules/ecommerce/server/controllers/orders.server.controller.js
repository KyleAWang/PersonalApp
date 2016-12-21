'use strict';

var path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    chalk = require('chalk'),
    Order = mongoose.model('Order');


exports.create = function (req, res) {
    var order = new Order(req.body);

    order.save(function (err) {
        if (err){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }else{
            res.json(order);
        }
    });
};

exports.update = function (req, res) {
    var _id = req.params._id;

    var _order = req.order;


    var order = req.body;


    // console.log('************order:'+order._id+'  '+ order.orderId);
    // var _id = order._id;
    // delete order._id;

    Order.update({_id: _id}, order, function (err) {
        if (err){
            console.log(err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }else {
            res.json(order);
        }
    });
    // Order.find({_id: order._id}, order, function (err, order) {
    //     if (err){
    //         message: errorHandler.getErrorMessage(err)
    //     }
    //
    //     Order.update(order._id, order, function (err) {
    //         if (err){
    //             return res.status(400).send({
    //                 message: errorHandler.getErrorMessage(err)
    //             });
    //         }else {
    //             res.json(order);
    //         }
    //     })
    // });

    // order.update(function (err) {
    //     if (err) {
    //         console.log('err********:');
    //         console.log(err);
    //         return res.status(400).send({
    //             message: errorHandler.getErrorMessage(err)
    //         });
    //     } else {
    //         console.log('json********');
    //         console.log(order);
    //         res.json(order);
    //     }
    // });

};

exports.delete = function (req, res) {
    // var order = req.order;
    var _id = req.params._id;
    console.log("orderId*********");
    console.log(_id);

    Order.findOne({_id: _id}, function (err, order) {
        console.log(order);
        if (err){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        order.remove(function (err) {
            if (err){
                console.log(err);
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            res.send(true);
        })
    });
    
    

    // Order.remove(orderId, function (err) {
    //     if (err){
    //         return res.status(400).send({
    //             message: errorHandler.getErrorMessage(err)
    //         });
    //     }else{
    //         res.send(true);
    //     }
    // });

    // order.remove(function (err) {
    //     if (err){
    //         return res.status(400).send({
    //             message: errorHandler.getErrorMessage(err)
    //         });
    //     }else{
    //         res.json(order);
    //     }
    // });
};

exports.list = function (req, res) {
    var offset = req.query.offset;
    var pageno = req.query.pageno;
    if (!isNaN(offset) && !isNaN(pageno)){
        var skipno = (pageno - 1)*offset;
        if (skipno < 0)
            skipno = 0;
        Order.find().sort('-created').skip(parseInt(skipno)).limit(parseInt(offset)).exec(function (err, orders) {
            if (err){
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }else {
                res.json(orders);
            }
        })
    }else{
        Order.find().sort('-created').exec(function (err, orders) {
            if (err){
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }else {
                res.json(orders);
            }
        })
    }

};

exports.orderByOrderId = function (req, res, next, orderId) {
    Order.findOne({'orderId' : orderId})
        .exec(function (err, order) {
            if (err){
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }else{
                res.json(order);
            }
        })
};