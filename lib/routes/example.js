'use strict';

var greet = function(req, res, next) {

  // typical response
  if(false)
    res.status(200).send('Hello World !');


  // simulating an error.
  var err = new Error('User not found');
  err.status = 404;
  next(err);
};

function example(router) {

  router.get('/', greet);
  
  return router;
}

module.exports = example;
