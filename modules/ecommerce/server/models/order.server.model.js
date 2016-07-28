'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    chalk = require('chalk');

console.log(chalk.red('order.server.model begin....'));

var OrderSchema = new Schema({
    orderId: {
        type: String
    },
    items: [{
        name: {
            type: String,
            trim: true
        },
        price: Number,
        quantity: Number,
        subtotal: Number,
        url: String
    }],
    shipping: [{
        no: String,
        url: String,
        status: String,
        items: String,
        localNo: String,
        localUrl: String
    }],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    subtotal: Number,
    totalCost: Number,
    totalRmbCost: Number,
    shiping_fee: Number,
    local_fee: Number,
    discount: Number,
    deduction: Number,
    total: Number,
    status: String,
    creator: String,
    modifier: String,
    address: {
        name: String,
        email: String,
        tel: String,
        zip: String,
        address: String,
        ID: String,
        weight: Number
    }
});

mongoose.model('Order', OrderSchema);