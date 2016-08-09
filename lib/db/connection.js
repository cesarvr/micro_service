'use strict';

var mongoskin = require('mongoskin');

var DBConnection = function(MONGO_URL, collection){

  var db = mongoskin.db(MONGO_URL, {safe:true})
  var collection = db.collection(collection);

  return collection;
}

module.exports = DBConnection;
