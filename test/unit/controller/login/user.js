
var superagent = require('superagent');
var expect = require('chai').expect;
var assert = require('chai').assert;
var DBConnection = require('../../../../lib/db/connection');
var login = require('../../../../lib/controller/login');



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

  it('testing db#isRegisteredBefore testing RegisteredLogin.', function(){

    assert.isFunction(login.isRegisteredBefore);

    return login.isRegisteredBefore(true)
                .catch(function(error){ assert.isNotNull(error, "no error should be thrown.") });
  });








});
