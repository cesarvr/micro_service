'use strict';

var express = require('express');
var _ = require('underscore');

var DefaultRouter = require('./lib/utils/routers/default');
var ErrorHandler = require('./lib/utils/errors/handler');
var ErrStrategies = require('./lib/utils/errors/basic');

var errorHandler = ErrorHandler([ErrStrategies.basic, ErrStrategies.log]);

var app = express();


app.use('/', require('./lib/routes/example')(DefaultRouter()));
app.use('/user/', require('./lib/routes/example')(DefaultRouter()));




errorHandler(app);

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


app.listen(port, host, function() {
  console.log("Server started At: " + new Date() + " on port: " + port);
});
