function makeError(next, message, status){
  var error = new Error(message);
  error.status = status;
  next(error);
}

function makeDBError(next) {
  return function(){
    console.log('error 500!!');
    makeError(next, "Error in the database", 500);
  }
}

module.exports = {newError: makeError,
                  dbError: makeDBError };
