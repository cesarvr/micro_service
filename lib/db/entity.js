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

  this.getHandler = function(){
    return handler;
  }

  this.collectionName = function(name){
    collection = DBConnection.getCollection(name);
  }

  this.findById = function(req, res, next) {
    collection.findById( req.params.id, _.partial(handler, res, next) );
  }

  this.insert = function(req, res, next){
    //req.body => post params
    collection.insert(req.body, {}, _.partial(handler, res, next));
  }

  this.del = function(req, res, next){
    collection.removeById(req.params.id,  _.partial(handler, res, next) );
  }

};

module.exports = Entity;
