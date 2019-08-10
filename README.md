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

## Install

```bash
$ npm i egg-fetch-middleware --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.fetchMiddleware = {
  enable: true,
  package: "egg-fetch-middleware"
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.fetchMiddleware = {
  // The local and unittest environments are forced to be enabled. Other environments use this configuration to specify whether to display Error stack information when an error is thrown
  showStack: false,
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
  async convertToNumber(ctx) {
    const id = ctx.helper.convertToNumber(ctx.params.id);
    ctx.body = ctx.ok(id, {});
  }

  async index(ctx) {
    ctx.body = ctx.ok('Format 2xx data', {});
  }

  async sendInternalServerError(ctx) {
    const err = new Error('Custom 5xx server internal error');
    ctx.body = ctx.serverError(err);
  }

  async notFound(ctx) {
    ctx.throwError(404, 'Custom 4xx server internal error');
  }

  // Recommended to use a value greater than or equal to 10000 to use as a business error code
  async doBusinessError(ctx) {
    // Note: If throwError is on the server side, ctx.AcceptJSON must be true.
		// can refer to https://eggjs.org/api/Request.html#acceptJSON
    ctx.throwError(10000, 'Example, using 10000 as a business error code');
  }

  // Not recommended, but some business scenario is written like this.  Handle the front end by business error
  async doThrow5xxError(ctx) {
    // Note: If throwError is on the server side, ctx.AcceptJSON must be true.
		// can refer to https://eggjs.org/api/Request.html#acceptJSON
    ctx.throwError(500, 'It is not recommended to use the http status code to handle business errors.');
  }
}

module.exports = HomeController;
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs-community/egg/issues).

## License

[MIT](LICENSE)
