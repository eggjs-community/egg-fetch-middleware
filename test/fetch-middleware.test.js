'use strict';
const assert = require('power-assert');
const mock = require('egg-mock');

describe('test/fetch-middleware.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/fetch-middleware-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should get code 200', () => {
    assert(app.config.coreMiddleware.includes('errorHandler'));
    return app
      .httpRequest()
      .get('/ok')
      .expect(200)
      .expect({
        success: true,
        data: 'fetchMiddleware',
        meta: {},
        message: '',
      });
  });

  it('sendNotFound should get code 404', () => {
    return app
      .httpRequest()
      .get('/sendNotFound')
      .expect(404)
      .expect({});
  });

  it('sendNotFoundRoute should get code 404', () => {
    return app
      .httpRequest()
      .get('/sendNotFoundRoute')
      .expect(404)
      .expect({});
  });

  it('customServerError should get code 500', () => {
    return app
      .httpRequest()
      .get('/customServerError')
      .set('Accept', 'application/json')
      .expect(500)
      .expect(res => {
        assert(
          res.body &&
            res.body.code === 500 &&
            res.body.message === '自定义错误' &&
            res.body.success === false
        );
      });
  });

  it('sendInternalServerError should get code 500', () => {
    assert(app.config.coreMiddleware.includes('errorHandler'));
    return app
      .httpRequest()
      .get('/sendInternalServerError')
      .expect(500)
      .expect(res => {
        assert(
          res.body &&
            res.body.code === 500 &&
            res.body.message === '自定义服务器内部错误' &&
            res.body.success === false
        );
      });
  });

  it('param id should to 100', () => {
    return app
      .httpRequest()
      .get('/convertToNumber/100')
      .expect(200)
      .expect({
        success: true,
        data: 100,
        meta: {},
        message: '',
      });
  });
});
