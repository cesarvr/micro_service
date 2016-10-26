'use strict';

// Server errors.
function basicErrorResponse(error, req, res, next) {
  res.status(error.status || 500).send({ error: error.message });
  next(error);
}

// Catch-All errors.
function loginError(error, req, res, next) {
  console.log('error->', error);
  console.error('loggin:', error.stack); // using wiston.js or another logger API.
}


module.exports = function(router){
  router.use(basicErrorResponse);
  router.use(loginError);
}
