'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    express = require(path.resolve('./config/lib/express'));

var app,
    agent;

describe('Finance tests', function () {
    
    before(function (done) {
        app = express.init();
        agent = request.agent(app);
        done();
    });

    it('should read some valuable data', function (done) {
        agent.get('/api/exchange/NZD/CNY')
            .expect(200)
            .end(function (err, res) {
                if (err){
                    return done(err);
                }
                // console.log(res.body);
                res.body.id.should.equal('NZDCNY');
                res.body.Rate.should.not.be.empty;
                return done();
            });
    })
    
    
});