'use strict';

var mongoskin = require('mongoskin');

var DBConnection = function(MONGO_URL){

  var db = mongoskin.db(MONGO_URL, {safe:true})
  
  this.getCollection = function(collection){
    return db.collection(collection);
  }
}

module.exports = DBConnection;
