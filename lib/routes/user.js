'use strict';
var Entity = require('../db/entity');
var common = require('../db/common');
var util = require('../utils/util');
var _ = require('underscore');




function sendmail(user, req, res, next){
  user.insert({ body: {name:'Tom', age:40, weight: 50} }, res, next );
}

function register(DBConnection, req, res, next) {

    var _sendmail = _.partial( sendmail, DBConnection.use('user') );

    var error500 = util.dbError(next);

    common.exist(DBConnection.use('user')).then( function(exist){
      if(!exist)
        _sendmail(req, res, next);
      else
        util.newError(next, "repeated field", 501);
    }).catch(error500);
};


function example(router, DBObject) {

  var user = new Entity(DBObject);
  user.collectionName('user');

  router.get('/create/', _.partial(register, DBObject));
  router.get('/:id', user.findById );
  router.get('/', user.find );

  return router;
}

module.exports = example;
