'use strict';

var HtmlReporter = require('protractor-html-screenshot-reporter');

var config = {
    specs: ['modules/*/tests/e2e/*.js'],
    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'c:/tmp/screenshots'
        }));
    }
}

if (process.env.TRAVIS){
    config.capabilities = {
        browserName: 'firefox'
    };
}

exports.config = config;