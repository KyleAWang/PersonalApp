'use strict';

var _ = require('lodash'),
    defaultAssets = require('./config/assets/default'),
    testAssets = require('./config/assets/test'),
    fs = require('fs'),
    path = require('path');

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            test: {
                NODE_ENV: 'test'
            },
            dev: {
                NODE_ENV: 'development'
            }
        },
        watch: {
            serverViews: {
                files: defaultAssets.server.views,
                options:{
                    debounceDelay: 300,
                    livereload: true
                }
            },
            serverJS: {
                files: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS),
                options: {
                    debounceDelay: 300
                }
            },
            clientViews: {
                files: defaultAssets.client.views,
                options: {
                    debounceDelay: 300,
                    livereload: true
                }
            },
            clientJS: {
                files: defaultAssets.client.js,
                options: {
                    debounceDelay: 300,
                    livereload: true
                }
            },
            clientCSS: {
                files: defaultAssets.client.css,
                options: {
                    debounceDelay: 300,
                    livereload: true
                }
            },
            clientLESS: {
                files: defaultAssets.client.less,
                tasks: ['less'],
                options: {
                    debounceDelay: 300,
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js, html',
                    watch: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true
            }   
        },
        less:{
            dist:{
                files: [{
                    expand: true,
                    src: defaultAssets.client.less,
                    ext: '.css',
                    rename: function (base, src) {
                        return src.replace('/less/', '/css/')
                    }
                }]
            }
        },
        'node-inspector':{
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        protractor: {
            options: {
                configFile: 'protractor.conf.js',
                noColor: false,
                webdriverManagerUpdate:true
            },
            e2e: {
                options: {
                    args: {}
                }
            }
        },
        mochaTest: {
            src: testAssets.tests.server,
            options: {
                reporter: 'spec',
                timeout: 10000,
                grep: 'Order Model Unit Tests:'
            }
        }
    });
    
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-protractor-coverage');
    
    grunt.task.registerTask('server', 'Starting the server', function () {
        var done = this.async();
        
        var path = require('path');
        var app = require(path.resolve('./config/lib/app'));
        var server = app.start(function () {
            done();
        });
    });
    
    grunt.task.registerTask('dropdb', 'drop the database', function () {
        var done = this.async();
        
        var mongoose = require('./config/lib/mongoose');
        
        mongoose.connect(function (db) {
            db.connection.db.dropDatabase(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Successfully dropped db: ', db.connection.db.databaseName);
                }
                db.connection.db.close(done);
            })
        })
    });
    
    grunt.registerTask('test:server', ['env:test', 'server', 'mochaTest']);
    grunt.registerTask('test:client', ['karma:unit']);
    grunt.registerTask('test:e2e', ['env:test', 'dropdb', 'server', 'protractor']);
    
    
    grunt.registerTask('default', ['env:dev', 'less', 'concurrent:default']);
};
    
    