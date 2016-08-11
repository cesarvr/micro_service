'use strict';
var _ = require('underscore');

var Entity = function(DBConnection){
  var collection = null;

  var handler = function(res, next, e, result) {
    if (e) return next(e);
    res.send( { response: result } );
  };

  this.setHandler = function(_handler){
    handler = _handler;
  }

  this.collectionName = function(name){
    collection = DBConnection.use(name);
  }

  this.findById = function(req, res, next) {
    collection.findById( req.params.id, _.partial(handler, res, next));
  }

  this.find = function(req, res, next) {
    collection.find( req.params || req.body || {}).toArray(  _.partial(handler, res, next) );
  }

  this.insert = function(req, res, next){
    collection.insert(req.body, {}, _.partial(handler, res, next) );
  }

  this.removeById = function(req, res, next){
    collection.removeById(req.params.id,  _.partial(handler, res, next) );
  }

};

module.exports = Entity;
