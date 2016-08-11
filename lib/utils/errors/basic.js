// Server errors.
var BasicErrorResponse = function(error, req, res, next) {
  res.status(error.status).send({ error: error.message });
  next(error);
}

// Catch-All errors.
var LoginError = function(error, req, res, next) {
  console.error('loggin:', error.stack); // using wiston.js or another logger API.
  next(error);
}


module.exports = {
  basic: BasicErrorResponse,
  log: LoginError
};
