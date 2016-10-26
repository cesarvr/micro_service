'use strict';

function profiling(name, restfulAction,  ...params) {
    console.log('db action ->', name);

    console.time("db");
    let ret = restfulAction(...params);
    console.timeEnd("db");

    return ret;
}


// Just add some quick new behaviour to the CRUD.
function decorate(rest) {

    console.log(' ## decorating crud. ##');

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
