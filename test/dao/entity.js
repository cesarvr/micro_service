var superagent = require('superagent');
var expect = require('chai').expect;
var assert = require('chai').assert;
var DBConnection = require('../../lib/db/connection');
var Entity = require('../../lib/db/entity');

var MONGO_URL = process.env.MONGO_URL || 'mongodb://@localhost:27018/test';

describe('Testing User DAO', function() {

  var db = null;
  var user = null;

  it('should be an object', function(){
    assert.isFunction(DBConnection, 'should be a function.');

    db = new DBConnection(MONGO_URL);

    assert.isObject(db, 'should be an new DBConnection instance');
  });

  it('testing DBConnection#use', function() {

    assert.isFunction(db.use, 'should DBConnection#Collection exist.');
    user = db.use('user');
    assert.isObject(user, 'should be an new DBConnection#Collection object');
  });


  it('create', function(done) {

    user.insert({name:'Tom', age:40, weight: 50 }, {}, function(error, results){
      assert.isNull(error);

      assert.isArray(results, 'return an array.');
      var res = results[0];

      assert.isDefined(res.name, 'result.name has been defined');
      assert.isDefined(res.age, 'result.age has been defined');
      assert.isDefined(res.weight, 'result.weight has been defined');
      assert.isDefined(res._id, 'result.id has been defined');

      done();
    });
  });

  var entity;

  it('Testing Entity', function() {
    assert.isFunction(Entity, 'should be a function.');

    entity = new Entity(db);

    assert.isObject(entity, 'should be an new Entity instance');
    assert.isFunction(entity.setHandler, 'setHandler should a exist.');
    assert.isFunction(entity.insert, 'insert should a exist.');
    assert.isFunction(entity.collectionName, 'collectionName should a exist.');
  });

  it('Entity#insert', function(done) {

    var handler = function(res, next, error, result) {
      assert.isNull(error);

      assert.isArray(result, 'return an array.');
      var res = result[0];

      assert.isDefined(res.name, 'result.name has been defined');
      assert.isDefined(res.age, 'result.age has been defined');
      assert.isDefined(res.weight, 'result.weight has been defined');
      assert.isDefined(res._id, 'result.id has been defined');

      res._id

      done();
    };

    entity.collectionName('user');


    entity.setHandler(handler);

    entity.insert({body: { name:'Tom', age:40, weight: 50 } });
  });

  var id = null;
  before(function() {
    // runs before all tests in this block
    var db = new DBConnection(MONGO_URL);
    var user = db.use('user');
    user.insert({name:'Tom', age:40, weight: 50 }, {}, function(error, results){
      id = results[0]._id;
    });
  });


  it('Entity#findById', function(done) {
    var handler = function(res, next, error, result) {
      assert.isNull(error);

      assert.isObject(result, 'return an array.');

      assert.isDefined(result.name, 'result.name has been defined');
      assert.isDefined(result.age, 'result.age has been defined');
      assert.isDefined(result.weight, 'result.weight has been defined');
      assert.isDefined(result._id, 'result.id has been defined');

      done();
    };

    entity.setHandler(handler);

    entity.findById({params: { id: id } });
  });

  it('Entity#find', function(done) {
    var handler = function(res, next, error, result) {
      assert.isNull(error);
      assert.isArray(result, 'return an array.');
      done();
    };

    entity.setHandler(handler);

    entity.find({params: {} });
  });



 it('Entity#removeById', function(done) {
    var handler = function(res, next, error, result) {
      assert.isNull(error);
      assert.equal(result, 1, 'should be true');

      done();
    };
    entity.setHandler(handler);

    entity.removeById( { params: { id: id } } );

  });

});
