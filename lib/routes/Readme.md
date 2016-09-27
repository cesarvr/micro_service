# Routing module.

- crud.js just handle all CRUD HTTP verb's, and connect those verbs to actions using the controller/crud.

``` javascript

  var route = DefaultRouter();   //util/routers/default.js
  var companyCollection = db.collection('company');
  var crud = require('./controller/crud/crud');

  //creates a simple express router /company, to handle create/read/update/delete HTTP actions.
  var companyRoute = require('./lib/routes/crud').routing(route, companyCollection, crud);  // URL hostname:port/v1/company

  //listen for /company HTTP request.
  app.use('/company', companyRoute);
```


- company.js is just an example to showcase the decorator pattern to extend the basic behaviour of the crud.js router, example:

  use case: you create company entity (create/read/update/delete), but you want to avoid two companies with the same name.

``` javascript

  var route = DefaultRouter();   //util/routers/default.js
  var companyCollection = db.collection('company');
  var crud = require('./controller/crud/crud');

  //creates a simple express router that put in the HTTP POST additional functionality
  //validates if the company exists before.
  var company = require('./lib/routes/company').routing(route, companyCollection); //the signature here can vary what

  //HTTP POST Validation + CRUD functionality, open for extension and close for modification principle.
  var companyRoute = require('./lib/routes/crud').routing(company, companyCollection, crud);

  //listen for /company HTTP request.
  app.use('/company', companyRoute);
```
