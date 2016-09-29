# Basic DB module.

- it get a MongoDB object and are able to apply your typical DB operation, due to the dynamic nature of Javascript you can plug Mongoskin or Mongodb, for the async handling is using [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise).
  - find
  - findById
  - insert
  - updateById
  - removeById



```javascript

  var db = require('./lib/db/common');
   
  //basic signature, db.collection from mongoskin, mongoose, mongodb.

  db.insert(db.collection('user'), {})
    .then((result)=>handleUser)
    .catch((e)=>handleError);

```

If you imitate the interface of this class you can reuse the whole system with your favorite db provider. see [DAO pattern](https://en.wikipedia.org/wiki/Data_access_object) 


