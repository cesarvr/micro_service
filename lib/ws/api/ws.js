'use strict'
var soap = require('soap');


//Setting auth credentials.
function security(options, client) {
    if (options.username && options.password) {
        console.log('username:', options.username);
        console.log('password:', options.password);

        client.setSecurity(new soap.WSSecurity(options.username, options.password));
    }
}

function wsInit(options) {

    return new Promise(function(resolve, reject) {

        console.log('wsInit: getting WSDL/', options.url);

        soap.createClient(options.url, function(err, client) {
            console.log('wsInit: post-processing');

            if (err != null) {
                console.error('wsInit: we fail to get the WSDL');
                reject(err);
            }

            //configure ws-soap security.
            security(options, client);

            resolve(client);
        });
    });
};



module.exports = {
    ws: wsInit,
    security: security
};
