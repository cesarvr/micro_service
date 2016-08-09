'use strict';

var greet = function(req, res, next) {

  if(false)
    res.send('Hello World !');

 /* db error here */

  var err = new Error('User not found');
  err.status = 404;
  next(err);
};

function example(router) {
  // user/
  router.get('/', greet);

  // user/id:
  //router.post('/:id/', save);

  return router;
}

module.exports = example;
