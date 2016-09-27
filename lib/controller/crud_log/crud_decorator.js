'use strict';

function showParams(name, ...params) {
    console.log('function: [', name , '] : params->', params[2], ' body->', params[3]);
}

// Example of how to gracefully deactivate a service.
var idOverride = new Promise((resolve, reject) =>{
  resolve('Not in this version!');
});

// Just add some quick new behaviour to the CRUD.
function decorate(rest) {

    console.log(' ## decorating crud. ##');

    var create = rest.create;   
    var update = rest.update;
    var resById = rest.resourceById;

    rest.resourceById = function(...params) {
        showParams('findById', ...params);
        return resById( ...params);
    }

    rest.create = function(...params) {
        showParams('create', ...params);
        return create( ...params);
    }

    rest.update = function(...params) {
        showParams('update', ...params);
        return update( ...params);
    }

    return rest;
}

module.exports = decorate;
