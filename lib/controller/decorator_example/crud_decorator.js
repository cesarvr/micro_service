'use strict';
let logger = require('../../utils/util').Logger;

function profiling(name, restfulAction,  ...params) {
    logger.info('debug','db action ->'+ name);

    let ret = restfulAction(...params);
    return ret;
}


// Just add some quick new behaviour to the CRUD.
function decorate(rest) {

    logger.info(' ## decorating crud. ##', typeof rest);

    let create = rest.create;
    let update = rest.update;
    let resourceById = rest.resourceById;
    let remove = rest.remove;

    rest.resourceById = function(...params) {
        return profiling('resourceById', resourceById,  ...params);
    }


    rest.create = function(...params) {
        return profiling('create', create,  ...params);
    }


    rest.update = function(...params) {
        return profiling('update', update,  ...params);
    }

    rest.remove = function(...params) {
        return profiling('delete', remove,  ...params);
    }

    return rest;
}

module.exports = decorate;
