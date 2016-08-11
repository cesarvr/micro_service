
var superagent = require('superagent');
var expect = require('chai').expect;
var assert = require('chai').assert;
var DBConnection = require('../../lib/db/connection');
var common = require('../../lib/db/common')
var Entity = require('../../lib/db/entity');

var MONGO_URL = process.env.MONGO_URL || 'mongodb://@localhost:27018/test';

describe('Testing DB Functions', function() {
  var db = null;
  var user = null;
  var id = null;

  before(function() {
    // runs before all tests in this block
    db = new DBConnection(MONGO_URL);
    user = db.use('user');
    user.insert({name:'Tom', age:40, weight: 50 }, {}, function(error, results){
      id = results[0]._id;
    });
  });


  after(function() {
    // runs before all tests in this block
    user.removeById(id, function(o){ console.log('deleted')});
  });

  it('testing db#exist', function(){
    assert.isFunction(common.exist);
    return common.exist(db.use('user'), {age:40})
    .then(function(o){
      assert.isTrue(o, 'we should find this document. should be true');
    }).catch(function(error){ assert.isNull(error, "no error should be thrown.") });
  });
});
