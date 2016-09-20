'use strict';

/* Routing entry point */
function routing(router, collection, controller) {

    router.post('/', controller.adapter(controller.create, collection));
    router.get('/', controller.adapter(controller.resource, collection));
    router.get('/:id', controller.adapter(controller.resourceById, collection));
    router.put('/:id', controller.adapter(controller.update, collection));
    router.delete('/:id', controller.adapter(controller.remove, collection))

    return router;
};

module.exports = {
    routing: routing
};
