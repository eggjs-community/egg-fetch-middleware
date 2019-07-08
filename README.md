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
[snyk-image]: https://snyk.io/test/npm/egg-fetch-middleware/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-fetch-middleware
[download-image]: https://img.shields.io/npm/dm/egg-fetch-middleware.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-fetch-middleware

<!--
Description here.
-->

## Install

```bash
$ npm i egg-fetch-middleware --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.fetchMiddleware = {
  enable: true,
  package: 'egg-fetch-middleware',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.fetchMiddleware = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example


fetchMiddleware is a plugin for formatting and getting data interactions.

Once enabled in plugin.js, it can be handled directly in the controller or service via methods such as `ctx.ok(data, {})`. The following is `test/fixtures/apps/fetch-middleware-test/app/controller/home.js` (`return ctx.ok(data, {})` in service)

```javascript
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index(ctx) {
    const data = this.app.plugins.fetchMiddleware.name;
    ctx.body = ctx.ok(data, {});
  }

  async notFound(ctx) {
    const data = ctx.throwError(404, '未找到的数据');
    ctx.body = ctx.ok(data, {});
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



## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs-community/egg/issues).

## License

[MIT](LICENSE)

```

```