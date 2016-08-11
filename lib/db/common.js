'use strict';
var _ = require('underscore');

var Common = {};

function exist(collection, params){

  return new Promise(function(resolve, reject) {
      collection.findOne( params, function(error, result) {

        if(error) reject(error);

        if( _.isNull(result) )
          resolve(false);
        else
          resolve(true);
      });
  });
};

module.exports = {exist: exist};
