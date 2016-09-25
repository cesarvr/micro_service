'use strict';

var http = require('http');

var epod = require('./api/epod');
var pull = require('./api/pull');
var ws = require('./api/ws').ws;

//WS-Soap configuration. 
var username = process.env.WS_USER;
var password = process.env.WS_PASSWORD;
var url = 'http://10.2.2.2:8080/services/wsdl/MyServices.wsdl';
//====

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

function pullWS(client) {
    var current_ticket = null;

    return function() {
        console.log('current ticket->', current_ticket);

        return epod.getStuff(client, {})
            .then(epod.readWSResponse)
            .then(function(wsData) {
                current_ticket = wsData['nextConveyanceNoteNumber'];
            }).catch(pull.circuitBreaker);
    }
};


//setup the function to be call periodically.
var longPulling = pull.longPulling(pullWS);

//pull WSDL, then client generation.
var loadLineManagerWS = ws({
        username: username,
        password: password,
        url: url
    })
    .then(epod.checkWSClient)    // check for errors. 
    .then(longPulling)           // if good, longPulling will take care of the scheduling.
    .catch(epod.failHandler);    // fail net. 

