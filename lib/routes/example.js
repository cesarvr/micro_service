'use strict';

var greet = function(req, res, next) {
    res.status(200).send('Hello World !');
};

function example(router) {


  router.param('collectionName', function(req, res, next, collectionName){
    req.collection = db.collection(collectionName)
    return next()
  });

  router.get('/', greet);

  return router;
}

module.exports = example;
