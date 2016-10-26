let _ = require('lodash');
let winston = require('winston');
winston.add(winston.transports.File, { filename: './logs/service.log' });

function newError(message, status) {
    let error = new Error(message);
    error.status = status;
    return error;
}

function propagateError(next) {
    return function(message, status) {
        next(newError(message, status));
    }
}

function makeDBError(next) {
    return function() {
        newError(next, "Error in the database", 500);
    }
}

/*
  buildURL expect an object of the type {service, port};
*/
function toMongoURL(discover, dbName){
  return 'mongodb://@'+discover.service+':'+discover.port+'/'+ dbName;
}

// Modify mongodb url to add user and passw
function mongoCredentials(url, user, passw){
  return url.replace('@', user + ':' + passw + '@');
}


module.exports = {
    newError: newError,
    dbError: makeDBError,
    propagateError: propagateError,
    toMongoURL: toMongoURL,
    Logger: winston
};
