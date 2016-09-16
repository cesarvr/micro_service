'use strict';

var mongoskin = require('mongoskin');
var _ = require('underscore');
// this values come from the OSE3 template located in openshift3/node_mongo.json. 

const USER = process.env.MONGODB_USER;
const PASSWORD = process.env.MONGODB_PASSWORD;
const SERVICE = process.env.DATABASE_SERVICE_NAME;
const DB = process.env.MONGODB_DATABASE;

var createURL = function() {
    var credential = '', host;

    if (!_.isEmpty(USER) || !_.isEmpty(PASSWORD))
        credential = USER + ':' + PASSWORD;

    host = process.env[SERVICE + '_SERVICE_HOST'];

    if(_.isEmpty(host)){
      console.error('can\'t find service name'); 
      return undefined;
    }

    if(_.isEmpty(DB)){
      console.error('can\'t find Database name.'); 
      return undefined;
    }

    return 'mongodb://'+credential+'@'+host +':' + 27017 + '/' + DB;
}();

console.log('DB_URL: ', createURL);

var DBConnection = function(MONGO_URL) {

    var db = mongoskin.db(createURL || MONGO_URL, {
        safe: true
    })

    this.use = function(collection) {
        return db.collection(collection);
    }
}

module.exports = DBConnection;
