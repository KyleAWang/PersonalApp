'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    express = require(path.resolve('./config/lib/express'));


var app,
    agent;

describe('Core routes tests', function () {

    before(function (done) {
        app = express.init();
        agent = request.agent(app);
        done();
    });

    it('should get Xchange data', function (done) {
        agent.get('/')
            .expect(200)
            .end(function (err, res) {
                if (err){
                    return done(err);
                }
                return done();
            });
    })


});