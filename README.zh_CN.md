# egg-fetch-middleware

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-fetch-middleware.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-fetch-middleware
[travis-image]: https://img.shields.io/travis/eggjs-community/egg-fetch-middleware.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs-community/egg-fetch-middleware
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs-community/egg-fetch-middleware.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs-community/egg-fetch-middleware?branch=master
[david-image]: https://img.shields.io/david/eggjs-community/egg-fetch-middleware.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs-community/egg-fetch-middleware
[snyk-image]: https://snyk.io/test/npm/egg-fetch-middleware/badge.svg
[snyk-url]: https://snyk.io/test/npm/egg-fetch-middleware
[download-image]: https://img.shields.io/npm/dm/egg-fetch-middleware.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-fetch-middleware

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-fetch-middleware 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

### 依赖的插件
<!--

如果有依赖其它插件，请在这里特别说明。如

- security
- multipart

-->

## 开启插件

```js
// config/plugin.js
exports.fetchMiddleware = {
  enable: true,
  package: 'egg-fetch-middleware',
};
```

## 使用场景

fetchMiddleware 主要用于规范 fetch 数据交互的格式。

在 plugin.js 中启用后，在 controller 或 service 中可通过 `ctx.ok` 等方法来直接处理。以下是 `test/fixtures/apps/fetch-middleware-test/app/controller/home.js` （service中直接 `return ctx.ok(data, {})` )

```javascript
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index(ctx) {
    const data = this.app.plugins.fetchMiddleware.name;
    ctx.body = ctx.ok(data, {});
  }

  async notFound(ctx) {
    ctx.throwError(404, '未找到的数据');
  }

  async customServerError(ctx) {
    // 注意：如 throwError 服务器端错误时，须 ctx.AcceptJSON 为 true。
    // 可参考 https://eggjs.org/api/Request.html#acceptJSON
    ctx.throwError(500, '自定义错误');
  }

  async sendInternalServerError(ctx) {
    const err = new Error('自定义服务器内部错误');
    ctx.body = ctx.serverError(err);
  }

  async convertToNumber(ctx) {
    const id = ctx.helper.convertToNumber(ctx.params.id);
    ctx.body = ctx.ok(id, {});
  }
}

module.exports = HomeController;
```

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 单元测试

<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->

## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
