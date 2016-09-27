'use strict';

const default_interval = 17000;
var timer = null;

function circuitBreaker(err) {
    console.log('Error: ', err);
    console.log('Stopping WS Pulling.');
    clearInterval(timer);
}

function longPulling(pullWS, _interval) {

    return function(client, interval) {
        var ws = pullWS(client);
        var interval = _interval || default_interval;

        console.log('longPulling interval:', (interval/1000), ' seconds.');

        //every 5 seconds.
        timer = setInterval(ws, interval);
    }
}

module.exports = {
    longPulling: longPulling,
    circuitBreaker: circuitBreaker
};
