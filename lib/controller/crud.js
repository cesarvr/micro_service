'use strict';

var _ = require('underscore');

var commondb = require('../db/common');
var util = require('../utils/util');

/* CRUD Express adapter functions */
function create(collection, params, body) {
    return commondb.insert(collection, body);
}

function resource(collection) {
    return commondb.find(collection, {});
}

function resourceById(collection, params) {
    return commondb.findById(collection, params.id);
}

function update(collection, params, body) {
    return commondb.updateById(collection, params.id, body);
}

function remove(collection, params, body) {
    return commondb.removeById(collection, params.id);
}

/* helpers */
function response(dbPromise, response, next) {
    dbPromise.then((result) => response.status(200).send(result))
        .catch(util.propagateError(next));
}


/* Adapter Pattern using a proxy function. */
function adapter(crudPromise, collection) {
    return (req, res, next) => {
        
        var promise = crudPromise(collection, req.params, req.body);

        response(promise, res, next);
    };
};

module.exports = {
    create: create, 
    resource: resource, 
    resourceById: resourceById, 
    update: update,
    remove: remove,
    response: response, 
    adapter: adapter
};


