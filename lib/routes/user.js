'use strict';
var Entity = require('../db/entity');

function example(router, DBObject) {

  var user = new Entity(DBObject);

  user.collectionName('user');

  router.get('/', function(req, res, next){
    console.log('creating...');
    console.log('res->', res);
    user.insert({ body: {name:'Tom', age:40, weight: 50} }, res, next );
  });


  router.get('/:id', user.findById );

  return router;
}

module.exports = example;
