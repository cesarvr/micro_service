'use strict';

var express = require('express');
var _ = require('underscore');

var DBConnection = require('./lib/db/connection');

var DefaultRouter = require('./lib/utils/routers/default');
var ErrorHandler = require('./lib/utils/errors/util');
var ErrStrategies = require('./lib/utils/errors/basic');

var MONGO_URL = process.env.MONGO_URL || 'mongodb://@192.168.177.149:27018/sampledb';
var PORT = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var HOST = process.env.NODEJS_IP || '127.0.0.1';

var db = new DBConnection(MONGO_URL);


var errorHandler = ErrorHandler([ErrStrategies.basic,
                                 ErrStrategies.log]);

var app = express();


app.use('/user', require('./lib/routes/user')(DefaultRouter(), db));


// error handling middleware.
errorHandler(app);



app.listen(PORT, HOST, function() {
  console.log("Server ["+ HOST +"] started At: " + new Date() + "  on port: " + PORT);
});
