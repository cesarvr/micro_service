// Server errors.
var BasicErrorResponse = function(err, req, res, next) {
  res.status(500).send({ error: 'Something failed!' });
  next(err);
}

// Catch-All errors.
var LoginError = function(err, req, res, next) {
  console.error('loggin:', err.stack); // using wiston.js or another logger API.
}


module.exports = {
  basic: BasicErrorResponse,
  log: LoginError
};
