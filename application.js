'use strict';

var express = require('express');
var _ = require('underscore');

var DefaultRouter = require('./lib/utils/routers/default');
var ErrorHandler = require('./lib/utils/errors/handler');
var ErrStrategies = require('./lib/utils/errors/basic');





var errorHandler = ErrorHandler([ErrStrategies.basic, ErrStrategies.log]);

var app = express();

app.use('/', require('./lib/routes/example')(DefaultRouter()));

// error handling middleware.
errorHandler(app);

var MONGO_URL = process.env.MONGO_URL || 'mongodb://@localhost:27018/test';
var PORT = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var HOST = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.listen(PORT, HOST, function() {
  console.log("Server started At: " + new Date() + " on port: " + PORT);
});
