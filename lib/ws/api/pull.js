'use strict';
var interval = 17000;
var timer = null;

function circuitBreaker(err) {
    console.log('Error: ', err);
    console.log('Stopping WS Pulling.');
    clearInterval(timer);
}

function longPulling(pullWS) {

    return function(client) {
        console.log('longPulling interval:', (interval/1000), ' seconds.');
        var ws = pullWS(client);

        //every 5 seconds.  
        timer = setInterval(ws, interval);
    }
}

module.exports = {
    longPulling: longPulling,
    circuitBreaker: circuitBreaker
};
