# Routing module.

- crud.js just handle all CRUD HTTP verb's, and connect those verbs to actions using the controller/crud.

``` javascript

  //creates a simple express router /company, to handle create/read/update/delete HTTP actions.
  var crud = require('./lib/routes/crud').routing(DefaultRouter(), db.collection('company'), crud);  // URL hostname:port/v1/company

  //listen for /company HTTP request.
  app.use('/company', crud);
```


- company.js is just an example to showcase the decorator pattern to extend the basic behaviour of the crud.js router, example:

use case: you create company entity (create/read/update/delete), but you want to avoid two companies with the same name.

``` javascript
  //creates a simple express router that put in the HTTP POST additional functionality
  //validates if the company exists before.
  var company = require('./lib/routes/company').routing(DefaultRouter(), db.collection('company'));

  //HTTP POST Validation + CRUD functionality, open for extension and close for modification principle.
  var crud = require('./lib/routes/crud').routing(company, db.collection('account'), crud);

  //listen for /company HTTP request.
  app.use('/company', crud);
```
