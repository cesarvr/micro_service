var superagent = require('superagent');
var expect = require('chai').expect;
var assert = require('chai').assert;
var DBConnection = require('../../lib/db/connection');

var MONGO_URL = process.env.MONGO_URL || 'mongodb://@localhost:27018/test';

describe('Testing User DAO', function() {

  var db = null;
  var user = null;

  it('should be an object', function(){
    assert.isFunction(DBConnection, 'should be a function.');

    db = new DBConnection(MONGO_URL);

    assert.isObject(db, 'should be an new DBConnection instance');
  });

  it('testing DBConnection#getCollection', function() {
   
    assert.isFunction(db.getCollection, 'should DBConnection#Collection exist.');
    user = db.getCollection('user');
    assert.isObject(user, 'should be an new DBConnection#Collection object');
  });


  it('create', function(done) {

    user.insert({name:'Tom', age:40, weight: 50 }, {}, function(error, results){

      assert.isArray(results, 'return an array.');
      var res = results[0];

      assert.isNull(error);
      
      assert.isDefined(res.name, 'result.name has been defined');
      assert.isDefined(res.age, 'result.age has been defined');
      assert.isDefined(res.weight, 'result.weight has been defined');
      assert.isDefined(res._id, 'result.id has been defined');

      done();
    });

  });

});
