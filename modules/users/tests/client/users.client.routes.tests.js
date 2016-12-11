/**
 * Created by Kyle on 12/10/2016.
 */
(function () {
    'use strict';

    describe('Users Route Tests', function () {
        // Initialize global variables
        var $scope,
            Authentication;

        // We can start by loading the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function ($rootScope, _Authentication_) {
            // Set a new global scope
            $scope = $rootScope.$new();
            Authentication = _Authentication_;
        }));

        describe('Settings Route Config', function () {

        describe('Authentication Route Config', function () {

            describe('Signup Route', function () {
                var signupstate;
                beforeEach(inject(function ($state) {
                    signupstate = $state.get('authentication.signup');
                }));

                it('Should have the correct URL', function () {
                    expect(signupstate.url).toEqual('/signup');
                });

                it('Should not be abstract', function () {
                    expect(signupstate.abstract).toBe(undefined);
                });

                it('Should have templateUrl', function () {
                    expect(signupstate.templateUrl).toBe('modules/users/client/views/authentication/signup.client.view.html');
                });
            });

            describe('Signin Route', function () {
                var signinstate;
                beforeEach(inject(function ($state) {
                    signinstate = $state.get('authentication.signin');
                }));

                it('Should have the correct URL', function () {
                    expect(signinstate.url).toEqual('/signin?err');
                });

                it('Should not be abstract', function () {
                    expect(signinstate.abstract).toBe(undefined);
                });

                it('Should have templateUrl', function () {
                    expect(signinstate.templateUrl).toBe('modules/users/client/views/authentication/signin.client.view.html');
                });
            });

        });

        });
    });
    

}());
 
