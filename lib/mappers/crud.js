'use strict';

let _ = require('lodash');

// get a function that maps RESTful express.js function to a crud controller, from controllers folder.
module.exports = function(router, collection, controller) {

    if( _.isEmpty(controller), _.isEmpty(collection) )
      throw 'controller/collection object missing.';

    let adapter = controller.adapter;

    router.post('/', adapter(controller.create, collection));
    router.get('/', adapter(controller.resources, collection));
    router.get('/:id', adapter(controller.resourceById, collection))
    router.put('/:id', adapter(controller.update, collection));
    router.delete('/:id', adapter(controller.remove, collection))

    return router;
};
