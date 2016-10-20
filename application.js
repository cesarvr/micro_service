'use strict';

// version 0.1
let express = require('express');

//db
let mongoskin = require('mongoskin');

//controller
let crud = require('./lib/controller/crud/crud');

let DefaultRouter = require('./lib/utils/routers/default');
let ErrorHandler = require('./lib/utils/errors/util');
let ErrorStrategy = require('./lib/utils/errors/basic');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://@192.168.177.150:27017/test';
const PORT = 8080;
const HOST = '0.0.0.0';

console.log("MONGO_URL->", MONGO_URL);

let db = mongoskin.db(MONGO_URL, {
    safe: true
});

let errorHandler = ErrorHandler([
    ErrorStrategy.basic,
    ErrorStrategy.log
]);

let app = express();
let companyCollection = db.collection('company')

// Append: MIDDLEWARES ===>  [VALIDATE] + [DO NOT EXIST BEFORE]
let company = require('./lib/routes/company').routing(DefaultRouter(), companyCollection);

app.get('/', (req, res) => res.send('Services deployed here.'));
// [VALIDATE] + [DO NOT EXIST BEFORE] + Bussiness logic.
app.use('/user',    require('./lib/routes/crud').routing(DefaultRouter(), db.collection('user'), crud));

// error handling middleware.
errorHandler(app);

app.listen(PORT, HOST, function() {
    console.log("Server [" + HOST + "] started At: " + new Date() + "  on port: " + PORT);
});
