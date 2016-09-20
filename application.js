'use strict';

var express = require('express');
var _ = require('underscore');


//db
var mongoskin = require('mongoskin');

//controller
var crud = require('./lib/controller/crud');

crud = require('./lib/controller/crud_decorator')(crud);

var DefaultRouter = require('./lib/utils/routers/default');
var ErrorHandler = require('./lib/utils/errors/util');
var ErrStrategies = require('./lib/utils/errors/basic');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://@192.168.177.150:27017/test';
const PORT = 8080;
const HOST = '0.0.0.0';

console.log("MONGO_URL->", MONGO_URL);

var db = mongoskin.db(MONGO_URL, {
    safe: true
})


var errorHandler = ErrorHandler([ErrStrategies.basic,
    ErrStrategies.log
]);

var app = express();

app.get('/', (req, res) => {
    res.send('services deployed here.');
});

app.use('/user', require('./lib/routes/basic').routing(DefaultRouter(), db.collection('user'), crud));

// error handling middleware.
errorHandler(app);

app.listen(PORT, HOST, function() {
    console.log("Server [" + HOST + "] started At: " + new Date() + "  on port: " + PORT);
});
