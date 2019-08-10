'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/convertToNumber/:id', controller.home.convertToNumber);
  router.get('/ok', controller.home.index);
  router.get(
    '/sendInternalServerError',
    controller.home.sendInternalServerError
  );

  router.get('/sendNotFound', controller.home.notFound);
  router.get('/doBusinessError', controller.home.doBusinessError);
  router.get('/doThrow5xxError', controller.home.doThrow5xxError);

};
