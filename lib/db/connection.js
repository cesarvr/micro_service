'use strict';

var mongoskin = require('mongoskin');

var DBConnection = function(MONGO_URL){

  var db = mongoskin.db(MONGO_URL || 'mongodb://@10.43.2.243:27018/sampledb', {safe:true})

  this.use = function(collection){
    return db.collection(collection);
  }
}

module.exports = DBConnection;
