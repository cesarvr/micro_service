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

function validate_db(db) {
    if (_.isEmpty(db)) throw newError('Invalid DBConnection.');
}

function validate(db, param) {
    validate_db(db);

    if (_.isEmpty(param)) throw newError('Missing parameter');
}

function wrap(fn, validation) {

    return (collection, param) => {
        validation(collection, param);
        return fn(collection, param);
    }
}

var findByName = function(lookup) {
    return function(name) {
        return name.indexOf(lookup) > -1;
    }
};

var getService = function() {
    var service = Object.keys(process.env)
        .filter(findByName('SERVICE_NAME'));
    
    if(service.length > 2){
      console.error('can\'t infer service name, log into the pod and wrote env | grep SERVICE_NAME make sure only one is available.');
      return undefined; 
    }else{
      return process.env[service];
    }
};





module.exports = {
    newError: newError,
    dbError: makeDBError,
    validate_db: validate_db,
    validate: validate,
    propagateError: propagateError,
    wrap: wrap,
    getService: getService
};
