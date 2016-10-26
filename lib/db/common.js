'use strict';

let _ = require('underscore');
let util = require('../utils/util');
let logger = util.Logger;

function validatedb(...params) {
    if ( Array.from(params)[0] === null ) throw new Error('Collection can\'t be empty.')
    if ( Array.from(params)[1] === null ) throw new Error('Missing parameter');
}

function prepare(dbOperation, validation) {
    return (...params) => {
        validation(...params);
        return dbOperation(...params);
    }
}

// findById: return a promise.
// resolve: get back a document by id.
function findById(collection, id , handleResults) {
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

// update: return a promise with mongodb update/return.
// resolve: return document.
// catch: database error.
function updateById(collection, id, body) {

    if (_.isEmpty(id)) throw "Missing id parameter";
    if (_.isEmpty(collection)) throw "Missing Collection";

    return new Promise(function(resolve, reject) {

        if (_.isEmpty(body)) {
            console.warn('Warning empty document in updateById');
        }

        collection.updateById(id, {
            $set: body || {}
        }, function(error, result) {

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
    find: find,
    findById: prepare(findById, validatedb),
    insert: insert,
    updateById: updateById,
    removeById: removeById,
};
