'use strict';

var mongoskin = require('mongoskin');

var DBConnection = function(MONGO_URL){

  var db = mongoskin.db(MONGO_URL || 'mongodb://user:user@192.168.177.149:27017/sampledb', {safe:true})

  this.use = function(collection){
    return db.collection(collection);
  }
}

module.exports = DBConnection;
