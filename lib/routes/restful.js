'use strict';

var _ = require('underscore');
var commondb = require('../db/common');
var util = require('../utils/util');

function params(service) {
  if(!_.isEmpty(service.request.body)) return service.request.body;
  if(!_.isEmpty(service.request.params)) return service.request.params;
  
  return {};
};

function response(service, status, data) {
  service.response.status(200).send(data);
}


//CRUD 
function resource(service) {
    commondb
    .find(service.collection, {})
    .then((results) => response(service, 200, results))
    .catch(util.propagateError(service.next));
};

function getResourceById(service) {
    commondb
    .findById(service.collection, params(service).id)
    .then((results) => response(service, 200, results))
    .catch(util.propagateError(service.next));
};

function create(service) {
    commondb
    .insert(service.collection, params(service))
    .then((results) => response(service, 200, results))
    .catch(util.propagateError(service.next));
};

function remove(service) {
    commondb
    .removeById(service.collection, params(service).id)
    .then((results) => response(service, 200, results))
    .catch(util.propagateError(service.next));
};

// read express params
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

function example(router, collection) {

    router.get('/', readParams(resource, collection) );
    router.get('/:id', readParams(getResourceById, collection) );
    router.post('/', readParams(create, collection) );
    router.delete('/:id', readParams(remove, collection))

    return router;
};

module.exports = example;
