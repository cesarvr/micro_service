var _ = require('underscore');

function newError(message, status) {
    var error = new Error(message);
    error.status = status;
    return error;
}

function propagateError(next) {
    return function(message, status) {
        next(makeError(message, status));
    }
}

function makeDBError(next) {
    return function() {
        makeError(next, "Error in the database", 500);
    }
}

/*
  buildURL expect an object of the type {service, port};
*/
function buildURL(discover, collectionName){
  return 'mongodb://@'+discover.service+':'+discover.port+'/'+ collectionName;
}

module.exports = {
    newError: newError,
    dbError: makeDBError,
    propagateError: propagateError,
    buildURL: buildURL
};
