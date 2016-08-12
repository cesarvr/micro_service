'use strict';
var _ = require('underscore');


function exist(collection, params){

  return new Promise(function(resolve, reject) {
      collection.findOne( params || {}, function(error, result) {
        if(error) reject(error);

        if( _.isNull(result) )
          resolve(false);
        else
          resolve(true);
      });
  });
};

function findById(collection, id) {
  return new  Promise(function(resolve, reject) {

    collection.findById( id, function(error, result){

      if(_.isEmpty(id))
        reject(new Error('id shouldn\'t be empty.'));

      if(error)
        reject(error);

      resolve(result);
    });

  });
};

function insert(collection, body) {
  return new  Promise(function(resolve, reject) {
    collection.insert( body, {}, function(error, result){
      if(error)
        reject(error);

      resolve(result);
    });
  });
};

// removeById: return a promise.
// resolve: return true when removed correctly.
// catch: error in data base
function removeById(collection, id){
  return new  Promise(function(resolve, reject) {
    collection.removeById(id, function(error, result){
      if(error)
        reject(error);

      resolve(result===1?true: false);
    });
  });
};

module.exports = {exist: exist, findById: findById, insert:insert, removeById:removeById};
