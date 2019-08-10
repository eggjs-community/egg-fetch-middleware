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

  it('should get code 200', () => {
    assert(app.config.coreMiddleware.includes('errorHandler'));
    return app
      .httpRequest()
      .get('/ok')
      .expect(200)
      .expect({
        success: true,
        data: '规范正常2xx数据的格式',
        meta: {},
        message: '',
      });
  });

  it('sendInternalServerError should get code 500', () => {
    assert(app.config.coreMiddleware.includes('errorHandler'));
    return app
      .httpRequest()
      .get('/sendInternalServerError')
      .expect(500)
      .expect(res => {
        assert(res.body);
        assert.equal(res.body.code, 500);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, '自定义5xx服务器内部错误');
        assert.deepEqual(res.body.data, {});
        assert.deepEqual(res.body.meta, {});
        assert.ok(res.body.stack);
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

  it('doBusinessError should get code 200', () => {
    return app
      .httpRequest()
      .get('/doBusinessError')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(res => {
        assert(res.body);
        assert.equal(res.body.code, 200);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, '示例10000，供业务错误码使用');
        assert.deepEqual(res.body.data, {});
        assert.deepEqual(res.body.meta, {});
        assert.ok(res.body.stack);
      });
  });

  it('doThrow5xxError should get code 200', () => {
    return app
      .httpRequest()
      .get('/doThrow5xxError')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(res => {
        assert(res.body);
        assert.equal(res.body.code, 200);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, '不推荐占用http状态码处理业务错误');
        assert.deepEqual(res.body.data, {});
        assert.deepEqual(res.body.meta, {});
        assert.ok(res.body.stack);
      });
  });

});
