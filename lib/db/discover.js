'use strict';

let discovery = require('sdiscovery');
let _ = require('underscore');

/*
  For development.
*/
function getURLFromEnv() {
  return {
    service: process.env.MONGO_IP || '0.0.0.0',
    port: process.env.MONGO_PORT  || 27017
  }
}

/*
  buildURL expect an object of the type {service, port};
*/
function buildURL(discover, collectionName){
  return 'mongodb://@'+discover.service+':'+discover.port+'/'+ collectionName;
}

function discover() {
  let conn = sdiscovery.searchInEnvVars('mongodb');
  let found = _.values(conn).filter(_.isUndefined).length === 0;

  if(found)
    return buildURLconn;
  else
    return getURLFromEnv();
}

module.exports = {
  buildURL: buildURL,
  discover: discover,
  getURLFromEnv: getURLFromEnv
};
