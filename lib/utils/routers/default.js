'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var DefaultRouter = function(){
  var router = new express.Router();

  router.use(cors());
  router.use(bodyParser.urlencoded({extended: true}));
  router.use(bodyParser.json());

  return router;
}

module.exports = DefaultRouter;
