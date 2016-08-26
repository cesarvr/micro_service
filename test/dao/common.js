var superagent = require('superagent');
var expect = require('chai').expect;
var assert = require('chai').assert;
var DBConnection = require('../../lib/db/connection');
var common = require('../../lib/db/common')
var Entity = require('../../lib/db/entity');


var MONGO_URL = process.env.MONGO_URL || 'mongodb://@10.43.2.243:27018/test';

describe('Testing DB Functions', function() {
    var db = null;
    var user = null;
    var id = null;

    before(function() {
        this.timeout(60000);
        // runs before all tests in this block
        db = new DBConnection(MONGO_URL);
        user = db.use('user');
        return common.insert(db.use('user'), {
            name: 'Tom',
            age: 40,
            weight: 50
        }).then((r) => {
            id = r.ops[0]._id;
        });
    });

    after(function() {
        this.timeout(60000);
        // runs before all tests in this block
        user.removeById(id, function(o) {
            console.log('deleted')
        });
    });


    it('testing db#findById handling non-db case', function() {
        assert.isFunction(common.findById);

        assert.throws(function() {
            common.findById(null, null)
        }, Error, 'Invalid DBConnection.');
    });

    it('testing db#findById handling empty parameters case', function() {
        this.timeout(60000);
        assert.isFunction(common.findById);

        assert.throws(function() {
            common.findById(db.use('user'), null)
        }, Error, 'Missing parameter');
    });

    it('testing db#create should create a new document in mongodb', function() {
        this.timeout(60000);
        assert.isFunction(common.insert);

        return common.insert(db.use('user'), {
                name: 'Tom',
                age: 40,
                weight: 50
            })
            .then(function(results) {
                var result = results[0];
                assert.isObject(result, 'return an object.');

                assert.isDefined(result.name, 'result.name has been defined');
                assert.isDefined(result.age, 'result.age has been defined');
                assert.isDefined(result.weight, 'result.weight has been defined');
                assert.isDefined(result._id, 'result.id has been defined');

                assert.equal(result.age, 40, 'should be 40 years old');
            }).catch(function(error) {
                assert.isNotNull(error, "no error should be thrown.")
            });
    });


    it('testing db#updateById should update a new document in mongodb', function() {
        assert.isFunction(common.updateById);

        return common.updateById(db.use('user'), id, {
                name: 'Pepe',
                age: 55,
                weight: 350
            })
            .then(() => assert.deepEqual(ret, { ok: 1, nModified: 1, n: 1 }) )
            .catch(function(error) {
                assert.isNotNull(error, "no error should be thrown.")
            });
    });




    it('testing db#findById', function() {
        assert.isFunction(common.findById);

        return common.findById(db.use('user'), id)
            .then(function(result) {

                assert.isObject(result, 'return an array.');

                assert.isDefined(result.name, 'result.name has been defined');
                assert.isDefined(result.age, 'result.age has been defined');
                assert.isDefined(result.weight, 'result.weight has been defined');
                assert.isDefined(result._id, 'result.id has been defined');

                assert.equal(result.age, 55, 'should be 55 years old');

            }).catch(function(error) {
                console.log('error=>', error);
                assert.isNull(error, "no error should be thrown.")
            });
    });

    it('testing db#exist', function() {
        this.timeout(60000);
        assert.isFunction(common.exist);

        return common.exist(db.use('user'), {
                age: 40
            })
            .then(function(o) {
                assert.isTrue(o, 'we should find this document. should be true');
            }).catch(function(error) {
                assert.isNull(error, "no error should be thrown.")
            });

    });


    it('testing db#find', function() {
        this.timeout(60000);
        assert.isFunction(common.removeById);

        return common.removeById(db.use('user'), id)
            .then(function(result) {
                assert.isTrue(result);
            });
    });



});
