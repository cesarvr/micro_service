'use strict';

function showParams(...params) {
    console.log('function: [', typeof params[0], '] : params->', params[2], ' body->', params[3]);
}

// Just add some quick new behaviour to the CRUD. 
function decorate(rest) {

    console.log(' ## applying enhancement to restful class. ##');

    console.log('methods->', Object.keys(rest))

    //base create
    var create = rest.create;
    var resById = rest.resourceById;

    rest.resourceById = function(...params) {
        console.log('findById', params[1]);
        return resById(...params);
    }

    console.log('overriding resourceById');

    rest.create = function(...params) {
        console.log('calling create!!!!');
        showParams(...params);
        return create(...params);
    }

    //base update
    var update = rest.update;

    rest.update = function(...params) {
        console.log('calling update!!!!');
        showParams(...params);
        return update(...params);
    }

    return rest;
}

module.exports = decorate;
