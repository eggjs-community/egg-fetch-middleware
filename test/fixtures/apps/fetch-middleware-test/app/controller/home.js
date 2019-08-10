'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async convertToNumber(ctx) {
    const id = ctx.helper.convertToNumber(ctx.params.id);
    ctx.body = ctx.ok(id, {});
  }

  async index(ctx) {
    ctx.body = ctx.ok('规范正常2xx数据的格式', {});
  }

  async sendInternalServerError(ctx) {
    const err = new Error('自定义5xx服务器内部错误');
    ctx.body = ctx.serverError(err);
  }

  async notFound(ctx) {
    ctx.throwError(404, '自定义4xx请求错误');
  }

  // 推荐使用大于等于 10000 的数值，来作为业务错误码使用
  async doBusinessError(ctx) {
    // 注意：如 throwError 服务器端错误时，须 ctx.AcceptJSON 为 true。
    // 可参考 https://eggjs.org/api/Request.html#acceptJSON
    ctx.throwError(10000, '示例10000，供业务错误码使用');
  }

  // 不推荐这类用法，但业务场景有这么写的。按业务错误给前端处理
  async doThrow5xxError(ctx) {
    // 注意：如 throwError 服务器端错误时，须 ctx.AcceptJSON 为 true。
    // 可参考 https://eggjs.org/api/Request.html#acceptJSON
    ctx.throwError(500, '不推荐占用http状态码处理业务错误');
  }
}

module.exports = HomeController;
