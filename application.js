'use strict';

// version 0.1
let app = require('express')();
let restful = require('./lib/routes/restful');
let errorHandling = require('./lib/utils/error-middleware/basic');

app.get('/', (req, res) => res.send('Services deployed here.'));

 // this function creates a router, controller, db of a given entity.
app.use('/user',restful({name:'user'}));

// want to create a crud with some profiling capabilities.
let profilingDecorator = require('./lib/controller/decorator_example/crud_decorator');

// new decorated crud.
app.use('/account',restful({name:'account', decorator: profilingDecorator}));

/*
  // if you want another entity
  app.use('/entity',restful({name:'entity'}));
*/

//setting-up error handling middleware.
errorHandling(app);

app.listen(8080, '0.0.0.0', function() {
    console.log("Server started At: " + new Date() + "  on port: " + 8080);
});
