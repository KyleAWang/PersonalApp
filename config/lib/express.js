'use strict';


var config = require('../config'),
    express = require('express'),
    morgan = require('morgan'),
    logger = require('./logger'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    compress = require('compression'),
    favicon = require('serve-favicon'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    helmet = require('helmet'),
    path = require('path'),
    _ = require('lodash'),
    lusca = require('lusca');


module.exports.initLocalVariables = function (app) {
    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;
    app.locals.jsFiles = config.files.client.js;
    app.locals.cssFiles = config.files.client.css;
    app.locals.livereload = config.livereload;
    app.locals.favicon = config.favicon;

    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.host = req.protocol + '://' + req.hostname;
        res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
        next();
    });
};


module.exports.initMiddleware = function (app) {
    // Showing stack errors
    app.set('showStackError', true);

    // Enable jsonp
    app.enable('jsonp callback');
    app.use(favicon(app.locals.favicon));

    // Should be placed before express.static
    app.use(compress({
        filter: function (req, res) {
            return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));


    // Enable logger (morgan) if enabled in the configuration file
    if (_.has(config, 'log.format')) {
        app.use(morgan(logger.getLogFormat(), logger.getMorganOptions()));
    }

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        // Disable views cache
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Add the cookie parser and flash middleware
    app.use(cookieParser());
    app.use(flash());
};

module.exports.initViewEngine = function (app) {
    // Set swig as the template engine

    // Set views path and view engine
    app.set('view engine', 'jade');
    app.set('views', './');
};

module.exports.initSession = function (app) {
    // Express MongoDB session storage
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        cookie: {
            maxAge: config.sessionCookie.maxAge,
            httpOnly: config.sessionCookie.httpOnly,
            // secure: config.sessionCookie.secure && config.secure.ssl
        },
        key: config.sessionKey,
        // store: new MongoStore({
        //     mongooseConnection: db.connection,
        //     collection: config.sessionCollection
        // })
    }));

    // Add Lusca CSRF Middleware
    app.use(lusca(config.csrf));
};


module.exports.initModulesConfiguration = function (app, db) {
    config.files.server.configs.forEach(function (configPath) {
        require(path.resolve(configPath))(app, db);
    });
};


module.exports.initHelmetHeaders = function (app) {
    // Use helmet to secure Express headers
    var SIX_MONTHS = 15778476000;
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.use(helmet.hsts({
        maxAge: SIX_MONTHS,
        includeSubdomains: true,
        force: true
    }));
    app.disable('x-powered-by');
};

/**
 * Configure the modules static routes
 */
module.exports.initModulesClientRoutes = function (app) {
    // Setting the app router and static folder
    app.use('/', express.static(path.resolve('./public')));

    // Globbing static routing
    config.folders.client.forEach(function (staticPath) {
        app.use(staticPath, express.static(path.resolve('./' + staticPath)));
    });
};

/**
 * Configure the modules server routes
 */
module.exports.initModulesServerRoutes = function (app) {
    // Globbing routing files
    config.files.server.routes.forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });
};

/**
 * Configure error handling
 */
module.exports.initErrorRoutes = function (app) {
    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) {
            return next();
        }

        // Log it
        console.error(err.stack);

        // Redirect to error page
        res.redirect('/server-error');
    });
};

module.exports.init = function () {

    // Initialize express app
    var app = express();

    // Initialize local variables
    this.initLocalVariables(app);

    // Initialize Express middleware
    this.initMiddleware(app);

    // Initialize Express view engine
    this.initViewEngine(app);

    // Initialize Helmet security headers
    this.initHelmetHeaders(app);

    // Initialize modules static client routes, before session!
    this.initModulesClientRoutes(app);

    // Initialize Express session
    this.initSession(app);

    // Initialize Modules configuration
    this.initModulesConfiguration(app);

    // Initialize modules server routes
    this.initModulesServerRoutes(app);

    // Initialize error routes
    this.initErrorRoutes(app);

    return app;
}