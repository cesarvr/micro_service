'use strict';

var mongoskin = require('mongoskin');
var _ = require('underscore');

var DBConnection = function(MONGO_URL) {

    var db = mongoskin.db(MONGO_URL, {
        safe: true
    })

    this.use = function(collection) {
        return db.collection(collection);
    }
}

module.exports = DBConnection;
