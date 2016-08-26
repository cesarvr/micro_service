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

module.exports = {
    newError: newError,
    dbError: makeDBError,
    validate_db: validate_db,
    validate: validate,
    propagateError: propagateError,
    wrap: wrap,
};
