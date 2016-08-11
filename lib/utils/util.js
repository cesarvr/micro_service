function makeError(next, message, status){
  var error = new Error(message);
  error.status = status;
  next(error);
}

function makeDBError(next) {
  makeError(next, "Error in the database", 500);
}

module.exports = {newError: makeError,
                  dbError: makeDBError };
