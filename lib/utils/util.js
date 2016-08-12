function makeError(message, status){
  var error = new Error(message);
  error.status = status;
}

function propagateError(next){
  console.log('propagateError init =>', typeof next);
  return function(message, status){
    console.log('propagateError next =>', status);
    next(makeError(message, status));
  }
}

function makeDBError(next) {
  return function(){
    console.log('error 500!!');
    makeError(next, "Error in the database", 500);
  }
}

module.exports = {newError: makeError,
                  dbError: makeDBError };
