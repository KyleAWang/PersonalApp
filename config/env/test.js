'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
    db: {
        uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/papp-test',
        options: {
            user: '',
            pass: ''
        },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    log: {
        // logging with Morgan - https://github.com/expressjs/morgan
        // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
        // format: 'dev'
        // fileLogger: {
        //   directoryPath: process.cwd(),
        //   fileName: 'app.log',
        //   maxsize: 10485760,
        //   maxFiles: 2,
        //   json: false
        // }
    },
    port: process.env.PORT || 3001,
    app: {
        title: defaultEnvConfig.app.title + ' - Test Environment'
    },
    // This config is set to true during grunt coverage
    coverage: process.env.COVERAGE || false
}