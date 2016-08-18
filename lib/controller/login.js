'use strict';
var _ = require('underscore');
var commonDB = require('../db/common');
var util = require('../utils/util');

function respondRequest(req){
  console.log('response..');
  req.send({result:'the user is registered.'});
}



function addUser(userCollection, param){

  return function(){
    return commonDB.insert(userCollection, {name:'Tom', age:40, weight: 50 });
  }
}

function isRegisteredBefore(isUserRegistered) {

      if(isUserRegistered)
        throw util.newError('User is registered');

      return true;
}

function create(DBObject, req, res, next){

  var userCollection = DBObject.use('user')

  commonDB.insert(userCollection, req.body)
    .then((result)=> res.status(200).send(result))
    .catch(util.propagateError(next));
};

module.exports =  {
    isRegisteredBefore:isRegisteredBefore,
    create:create
};
