# Basic CRUD module.

- crud.js takes a collection as an input and allow you to execute basic CRUD operations:

  - create
  - resources
  - resourceById
  - update
  - remove
  - [adapter](https://github.com/cesarvr/micro_service/blob/master/lib/controller/crud/crud.js#L38): is just a function adapter to interface with Express.js routing handler.   

```sh
  // it just handle the (req,res,next) interface and inject a db creation algorithm. 
  router.post('/', controller.adapter(controller.create, collection));
```

- crud_log just a basic class to show how to extend the CRUD API.  

```sh
  // it just handle the (req,res,next) interface and inject a db creation algorithm. 
  var crud = require('./lib/controller/crud/crud');
 
  // it just extends the behaviour of crud. (eg: everytime you call db:create it just logs the content) 
  var debug = require('./lib/controller/crud_log/crud_decorator')(debug); 
```


