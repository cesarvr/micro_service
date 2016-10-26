# Routing modules.


### restful (options)
 - This function creates a Express.js router ready to handle RESTful calls.
 - options
    - name : name of the entity.
    - route : you can pass your predefine router.
    - decorator: you can override the default behaviour of the crud class using [decorator](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternjavascript) pattern or  simple method override.

```javascript
// create entity router object.
let entity = restful({name:'entity'});
app.use('/entity', entity);

// create entity router object and specify the db name.
let entity = restful({name:'entity', db: 'my-db-name'});
app.use('/entity', entity);

// create entity router object and specify new router.
let routerWithJWToken = require('routerWithJWToken');
let entity = restful({name:'entity', router: routerWithJWToken});
app.use('/entity', entity);

// decorator
let fn = (crud)=>{ crud.create=()=>throw'block this' };
let entity = restful({name:'entity', decorator: fn});
app.use('/entity', entity);

```

### company
- Sometimes you need to implement more logic like validation, call another service first, etc. This module is an example on how to easily get this without violating the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle).

```javascript
// create entity router object.
let company = require('company')(dbapi);
app.use('/company', restful({
                        name:'company',
                        router:company
                    }));
```
