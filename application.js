'use strict';
// version 0.1

var express = require('express');

//db
var mongoskin = require('mongoskin');

//controller
var crud = require('./lib/controller/crud/crud');

var DefaultRouter = require('./lib/utils/routers/default');
var ErrorHandler = require('./lib/utils/errors/util');
var ErrorStrategy = require('./lib/utils/errors/basic');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://@192.168.177.150:27017/test';
const PORT = 8080;
const HOST = '0.0.0.0';

console.log("MONGO_URL->", MONGO_URL);

var db = mongoskin.db(MONGO_URL, {
    safe: true
});

var errorHandler = ErrorHandler([
    ErrorStrategy.basic,
    ErrorStrategy.log
]);

var app = express();

app.get('/', (req, res) => {
    res.send('Services deployed here.');
});

// Append: MIDDLEWARES ===>  [VALIDATE] + [DO NOT EXIST BEFORE]
var company = require('./lib/routes/company').routing(DefaultRouter(), db.collection('company'));

// [VALIDATE] + [DO NOT EXIST BEFORE] + Bussiness logic.
app.use('/company', require('./lib/routes/crud').routing(company, db.collection('company'), crud));
app.use('/account', require('./lib/routes/crud').routing(DefaultRouter(), db.collection('account'), crud))
app.use('/user',    require('./lib/routes/crud').routing(DefaultRouter(), db.collection('user'), crud));

// error handling middleware.
errorHandler(app);

app.listen(PORT, HOST, function() {
    console.log("Server [" + HOST + "] started At: " + new Date() + "  on port: " + PORT);
});
