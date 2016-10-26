'use strict';

let commondb = require('../db/common');
let _ = require('lodash');

function validate(_attrib) {

    var attrib = _attrib || [];

    return (req, res, next) => {

        var errors = attrib
            .filter((keys) => _.isEmpty(req.body[keys]))
            .length;

        if (errors > 0)
            res
            .status(400)
            .send({
                'message': 'invalid values expected ' + attrib.toString()
            })
        else
            next();
    };
};

function rejectDuplicated(collection) {

    return (req, res, next) => {

        commondb.find(collection, {
                name: req.body.name
            } || {})
            .then((results) => {

                if (results.length > 0)
                    res
                    .status(400)
                    .send({
                        'message': 'duplicated company'
                    });
                else
                    next();
            });
    }
};

function routing(router, collection) {

    router.post('/',
        validate(['name', 'registry']),
        rejectDuplicated(collection));

    return router;
};

module.exports = {
    routing: routing,
    validate: validate,
    rejectDuplicated: rejectDuplicated
};
