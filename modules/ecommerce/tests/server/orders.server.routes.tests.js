'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    chalk = require('chalk'),
    Order = mongoose.model('Order'),
    express = require(path.resolve('./config/lib/express'));

var app, agent, order, _order;

describe('Order CRUD tests', function () {
    before(function (done) {
        app = express.init();
        agent = request.agent(app);

        done();
    });

    beforeEach(function (done) {
        _order = new Order({
            orderId: '20160701156133',
            items: [
                {name: 'Swisse 血橙美肤饮料 500ml 促进生成胶原蛋白', price:22.00, quantity: 1, url:'http://www.wellcome.co.nz/product-708.html'},
                {name: 'Ecostore 纯天然温和羊奶皂 80克', price:2.45, quantity:1, url:'http://www.wellcome.co.nz/product-1094.html'}
            ],
            subtotal: '205.80'
        });
        done();
    });

    it('should be able to save a new order', function (done) {
        agent.post('/api/orders')
            .send(_order)
            .expect(200)
            .end(function (err, res) {
                if (err){
                    return done(err);
                }
                res.body.orderId.should.equal('20160701156133');
                return done();
            });
    });

    it('should be able to get new saved order', function (done) {
        agent.post('/api/orders')
            .send(_order)
            .expect(200)
            .end(function (err, res) {
                if (err){
                    return done(err);
                }
                res.body.orderId.should.equal('20160701156133');

                agent.get('/api/orders')
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exists(err);
                        return done();

                    });

            });
    });

    afterEach(function (done) {
        Order.remove().exec(done);
    })
});