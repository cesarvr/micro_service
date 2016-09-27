'use interval';

var _ = require('underscore');

/* Just check that the soap-client is correct. */
function checkWSClient(client) {

    if (_.isUndefined(client)) throw "Error to get a WS client";

    try {
        // showing some structure info
        console.log('methods->', Object.keys(client));
    } catch (e) {
        console.error('cannot get information from the webservice.');
    }

    return client;
};

//YourServiceEndpoint client here
function getStuff(client) {
    return new Promise(function(resolve, reject) {
        client.endCallPoint(function(err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
};

//handle WS response.
function readWSResponse(_loads) {
    if (_.isEmpty(_loads))
        throw 'Empty response from WS';
    return _load;
};

function failHandler(err) {
    console.log('failMiserably->', err, ' to add more stuff just override this function.');
};

module.exports = {
    getStuff: getStuff,
    checkWSClient: checkWSClient,
    failHandler: failHandler,
    readWSResponse: readWSResponse,
}
