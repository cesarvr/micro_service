'use strict';

var _ = require('underscore');
var commondb = require('../db/common');
var util = require('../utils/util');

//CRUD 

var CRUD = {

    resource: function(service) {
        commondb
            .find(service.collection, {})
            .then((results) => response(service, 200, results))
            .catch(util.propagateError(service.next));
    },

    getResourceById: function(service) {
        commondb
            .findById(service.collection, params(service).id)
            .then((results) => response(service, 200, results))
            .catch(util.propagateError(service.next));
    },

    create: function(service) {
        commondb
            .insert(service.collection, params(service))
            .then((results) => response(service, 200, results))
            .catch(util.propagateError(service.next));
    },

    remove: function(service) {
        commondb
            .removeById(service.collection, params(service).id)
            .then((results) => response(service, 200, results))
            .catch(util.propagateError(service.next));
    },
};

// read express params & response.

function params(service) {
    if (!_.isEmpty(service.request.body)) return service.request.body;
    if (!_.isEmpty(service.request.params)) return service.request.params;

    return {};
};

function response(service, status, data) {
    service.response.status(200).send(data);
}



var readParams = (handle, collection) => {
    return (req, res, next) => {
        handle({
            request: req,
            response: res,
            next: next,
            collection: collection,
        });
    };
};

function routing(router, collection) {

    router.get('/', readParams(CRUD.resource, collection));
    router.get('/:id', readParams(CRUD.getResourceById, collection));
    router.post('/', readParams(CRUD.create, collection));
    router.delete('/:id', readParams(CRUD.remove, collection))

    return router;
};

module.exports = {
    routing: routing,
    params: params,
    CRUD: CRUD,
};
