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

    return new Promise(function(resolve, reject){
      if(isUserRegistered)
        reject(util.makeError('User is registered'));
      else
        resolve();
    });
}

function register(DBObject, req, res, next){


  var userCollection = DBObject.use('user')

  commonDB.exist(userCollection, {age:40})
        .then(isRegisteredBefore)
        .then(addUser(userCollection, req.param)) // new user
        .then(respondRequest)
        .catch(util.propagateError(next));
};

module.exports =  {
    isRegisteredBefore:isRegisteredBefore,
    register:register
};
