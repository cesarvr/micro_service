'use strict';
var login = require('../controller/login');
var Entity = require('../db/entity');
var _ = require('underscore');

function example(router, DBObject) {

  var user = new Entity(DBObject);
  user.collectionName('user');

  router.get('/create/', _.partial(login.register, DBObject));
  router.get('/:id', user.findById );
  router.get('/', user.find );

  return router;
}

module.exports = example;
