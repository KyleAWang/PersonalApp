/**
 * Created by Kyle on 12/4/2016.
 */
'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    express = require(path.resolve('./config/lib/express'));


var app, agent, credentials, user, _user, admin;

describe('User CRUD tests', function () {
    before(function (done) {
        app = express.init(mongoose);
        agent = request.agent(app);

        done();
    });

    beforeEach(function (done) {
        credentials = {
            username: 'username',
            password: 'M3@n.jsI$Aw3$0m3'
        };

        _user = {
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: credentials.username,
            password: credentials.password,
            provider: 'local'
        };

        user = new User(_user);

        user.save(function (err) {
            should.not.exist(err);
            done();
        });
    });

    it('should be able to register a new user', function (done) {

        _user.username = 'register_new_user';
        _user.email = 'register_new_user_@test.com';

        agent.post('/api/auth/signup')
            .send(_user)
            .expect(200)
            .end(function (signupErr, signupRes) {
                if (signupErr) {
                    return done(signupErr);
                }

                signupRes.body.username.should.equal(_user.username);
                signupRes.body.email.should.equal(_user.email);
                // Assert a proper profile image has been set, even if by default
                // signupRes.body.profileImageURL.should.not.be.empty();
                // Assert we have just the default 'user' role
                signupRes.body.roles.should.be.instanceof(Array).and.have.lengthOf(1);
                signupRes.body.roles.indexOf('user').should.equal(0);
                return done();

            });
    });

    it('should be able to login successfully and logout successfully', function (done) {
        agent.post('/api/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function (signinErr, signinRes) {
                if (signinErr){
                    return done(signinErr);
                }

                agent.get('/api/auth/signout')
                    .expect(302)
                    .end(function (signoutErr, signoutRes) {
                        if (signoutErr){
                            return done(signoutErr);
                        }

                        signoutRes.redirect.should.equal(true);


                        if (process.version.indexOf('v4') === 0 || process.version.indexOf('v5') === 0){
                            signoutRes.text.should.equal('Found. Redirecting to /');
                        }else{
                            signoutRes.text.should.equal('Moved Temporarily. Redirecting to /');
                        }

                        return done();
                    })
            })
    });

    

    afterEach(function (done) {
        User.remove().exec(done);
    });

});

