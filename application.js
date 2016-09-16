'use strict';

var express = require('express');
var _ = require('underscore');

var DBConnection = require('./lib/db/connection');

var DefaultRouter = require('./lib/utils/routers/default');
var ErrorHandler = require('./lib/utils/errors/util');
var ErrStrategies = require('./lib/utils/errors/basic');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://@10.43.2.243:27018/test';
const PORT = 8080;
const HOST = '0.0.0.0';

var db = new DBConnection(MONGO_URL);

var errorHandler = ErrorHandler([ErrStrategies.basic,
    ErrStrategies.log
]);

var app = express();

app.get('/', (req, res) => {
    res.send('services deployed here.');
});

app.use('/user', require('./lib/routes/restful_decorator').routing(DefaultRouter(), db.use('user')));

// error handling middleware.
errorHandler(app);

app.listen(PORT, HOST, function() {
    console.log("Server [" + HOST + "] started At: " + new Date() + "  on port: " + PORT);
    console.log("MONGO_URL->", MONGO_URL);
});
