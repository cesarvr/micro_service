'use strict';

var _ = require('underscore');
var util = require('../utils/util');

// exist: given a mongodb query, check if document exist.

function exist(collection, params) {

    return new Promise(function(resolve, reject) {
        collection.findOne(params || {}, function(error, result) {

            if (error) {
                reject(error);
            }

            if (_.isNull(result)) {
                resolve(false);
            } else {
                resolve(true);
            }

        });

    });

};


// findById: return a promise.
// resolve: get back a document by id.
function findById(collection, id) {
    return new Promise(function(resolve, reject) {

        collection.findById(id, function(error, result) {

            if (error) {
                reject(error);
            }

            resolve(result);
        });

    });
};


// find: return a promise.
// resolve: get back a documents.
function find(collection, params) {
    return new Promise(function(resolve, reject) {
        collection.find(params || {}).toArray(function(error, result) {
            if (error) {
                reject(error);
            };

            resolve(result);
        });
    });
};


// insert: return a promise with mongodb insert/return.
// resolve: return document.
// catch: database error.
function insert(collection, body) {

    return new Promise(function(resolve, reject) {
        collection.insert(body, {}, function(error, result) {

            if (error) {
                reject(error);
            }

            resolve(result);
        });
    });
};


// removeById: return a promise.
// resolve: return true when removed correctly.
// catch: error in data base
function removeById(collection, id) {
    return new Promise(function(resolve, reject) {
        collection.removeById(id, function(error, result) {

            if (error) {
                reject(error);
            }

            resolve(result === 1 ? true : false);
        });
    });
};

module.exports = {
    exist: util.wrap(exist, util.validate_db),
    find: util.wrap(find, util.validate_db),
    findById: util.wrap(findById, util.validate),
    insert: util.wrap(insert, util.validate_db),
    removeById: util.wrap(removeById, util.validate),
};
