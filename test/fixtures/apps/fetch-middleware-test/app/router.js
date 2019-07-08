'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/ok', controller.home.index);
  router.get('/sendNotFound', controller.home.notFound);
  router.get(
    '/sendInternalServerError',
    controller.home.sendInternalServerError
  );
  router.get('/convertToNumber/:id', controller.home.convertToNumber);
};
