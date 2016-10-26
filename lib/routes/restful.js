'use strict';

let _ = require('lodash');

//db
let mongoskin = require('mongoskin');

//service discovery
let discover = require('../utils/discover').discover;
let util = require('../utils/util').toMongoURL;

let getMongoURL = util.toMongoURL; 
let logger = util.Logger; 

//controllers
let crudCtrl = require('../controller/crud/crud');
let newRouter = require('../utils/routers/default'); // create a predefined router.

module.exports = function(options){

  if(_.isEmpty(options))
    throw "need an options object with following signature {name, db[optional], decorator[optional]";

  //discover the db service pod by the name mongodb.
  let dbURL = getMongoURL(discover('mongodb'), options.db || 'test');
  let userCollection = mongoskin.db(dbURL, {safe: true}).collection(options.name);

  logger.info('mongodb->', dbURL);

  let _decorator = options.decorator || _.identity;

  // router ready to handle USER Restful HTTP request.
   let userRoute = require('../mappers/crud')(options.route || newRouter(), userCollection, _decorator(crudCtrl));
  //

  return userRoute;
}
