'use strict';
let logger = require('../util').Logger;
let discovery = require('sdiscovery');

// Server errors.
function basicErrorResponse(error, req, res, next) {
  res.status(error.status || 500).send({ error: error.message });
  next(error);
}

// Catch-All errors.
function loginError(error, req, res, next) {
  logger.error(discover.whoami() + ':' + error); // we identify our self in the network and log.
  logger.error(discover.whoami()+' error (stacktrace) >'+error.stack); // using wiston.js or another logger API.
}


module.exports = function(router){
  router.use(basicErrorResponse);
  router.use(loginError);
}
