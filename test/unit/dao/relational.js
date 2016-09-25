var expect = require('chai').expect;
var assert = require('chai').assert;
var mongoskin = require('mongoskin');

var relation = require('../../../lib/db/common_relation')
var db = null;
var user = null;
var company = null;

var id = null;
var company_id = null;


var common = require('../../../lib/db/common')
var lstid = [];
var MONGO_URL = process.env.MONGO_URL || 'mongodb://@192.168.177.150:27017/test';

console.log('MONGO_URL: ', MONGO_URL)

function rnd(n) {
    return Math.floor(Math.random() * n) + 1;
}


function create(col, name, age, w) {
    return common.insert(col, {
        name: name,
        age: rnd(age),
        weight: rnd(w)
    }).then((r) => {
        id = r.ops[0]._id;
        lstid.push(id);
    })
}

function create_house(col, name, w) {
    return common.insert(col, {
        name: name,
        registry: rnd(w)
    }).then((r) => {
        company_id = r.ops[0]._id;
        lstid.push(id);
    })
}



before(function() {

    // runs before all tests in this block
    db = mongoskin.db(MONGO_URL, {
        safe: true
    })

    user = db.collection('user');
    company = db.collection('company');

    create_house(company, "WBI", 10000);

    return create(user, 'Tom', 100, 20)
        .then(create(user, 'John', 200, 40));
});


describe('Testing DB Functions', function() {
    it('db relation#exists', function() {
        return relation.exists(user, id).then((r) => assert.isTrue(r, 'should exist'))
    });

    it('db relation#exists not found', function() {
        return relation.exists(user, '6666').catch((r) => assert.equal("id: " + '6666' + ' not found', r, 'should be equals'))

    });

    it('db relation#createOneToMany', function() {
        var ctu = db.collection('company_to_user');
        return relation.createOneToMany(ctu, {
            id: company_id,
            collection: company
        }, {
            id: id,
            collection: user
        })
    });



});
