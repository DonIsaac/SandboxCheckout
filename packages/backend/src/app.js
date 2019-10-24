const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config');
const Boom = require('@hapi/boom');
const Logger = require('./util/logger');

const logger = new Logger('app:application');
const app = express();

// Connect mongoose to MongoDB
mongooose.connect(config.db.uri, { useNewUrlParser: true });
mongoose.connection
    .on('error', err => logger.abort(1, 'Connection error: %s', err))
    .on('connected', () => logger.log('Successfully connected to MongoDB'));

// Set application variables
app.set('port', config.server.port);

// Mount middleware
app.use(helmet());
app.use(function(req, res, next) {
    // Client must accept json responses
    if (!req.accepts('json'))
        throw Boom.notAcceptable('Requests must be able to handle json responses.');
    // If content type header is specified, it must be some form of json
    else if (req.headers['content-type'] && !req.headers['content-type'].match(/^.*\/?json$/))
        throw Boom.notAcceptable('Content type must be json');
    else
        next();
});
app.use(express.json());
app.use(cookieParser());
// TODO: Use a rate limiter? https://www.npmjs.com/package/express-rate-limit

// TODO: Add components here

module.exports = app;
