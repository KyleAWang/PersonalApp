'use strict';


var should = require('should'),
    mongoose = require('mongoose'),
    chalk = require('chalk'),
    Order = mongoose.model('Order');

var order, order1, order2;

describe('Order Model Unit Tests:', function () {

    beforeEach(function (done) {
        order = new Order({
            orderId: '20160701156133',
            items: [
                {name: 'Swisse 血橙美肤饮料 500ml 促进生成胶原蛋白', price:22.00, quantity: 1, url:'http://www.wellcome.co.nz/product-708.html'},
                {name: 'Ecostore 纯天然温和羊奶皂 80克', price:2.45, quantity:1, url:'http://www.wellcome.co.nz/product-1094.html'}
            ],
            shipping: [
                {no: '24324erwer3', localNo: 'wqfewf3232'},
                {no: 'fqwefwef', localNo: 'fwqefqwef'}
            ],
            subtotal: '205.80'
        });
        order1 = new Order({
            orderId: '20160703202175',
            subtotal: 108.29,
            created: '07/02/2016 12:00',
            totalCost: 108.29,
            totalRmbCost: 508.97,
            address:{
                name: '张小燕',
                tel: '15801859839',
                weight: 3880,
                address: '中国上海市杨浦区控江路1505弄20号401'
            }
        });
        order2 = new Order({
            orderId: '20160703202055',
            subtotal: 118.44,
            created: '07/02/2016 13:00',
            totalCost: 118.44,
            totalRmbCost: 508.97,
            address:{
                name: '张小燕',
                tel: '15801859839',
                weight: 3880,
                address: '中国上海市杨浦区控江路1505弄20号401'
            }
        });
        done();
    });
    
    describe('Method Save', function () {
        it('should be able to save without problems', function (done) {
            return order.save(function (err) {
                should.not.exists(err);
                done();
            });
        });

        it('should get previous data from db', function (done) {
            Order.find({orderId: '20160701156133'}, function (err, orders) {
                should.not.exists(err);
                done();
            });
        });
        
        it('Should be correct when saving two similar orders', function (done) {
            order1.save(function (err, order1) {
                should.not.exists(err);
                console.log(order1);

                order2.save(function (err, order2) {
                    console.log(order2);
                    should.not.exists(err);
                    should.notEqual(order1.orderId, order2.orderId);
                    done();
                })
            })
        })
    });
    
    
    after(function (done) {
        Order.remove().exec();
        done();
    });
});