'use strict';

let discovery = require('sdiscovery');
let _ = require('lodash');

/*
  For development.
*/
function getURLFromEnv() {
  return {
    service: process.env.MONGO_IP || '0.0.0.0',
    port: process.env.MONGO_PORT  || 27017
  }
}

function discover(name) {
  let conn  = discovery.searchInEnvVars(name || 'mongodb');
  let found = _.values(conn).filter(_.isUndefined).length === 0;

  if(found)
    return conn;
  else
    return getURLFromEnv();
}

module.exports = {
  discover: discover,
  getURLFromEnv: getURLFromEnv
};
