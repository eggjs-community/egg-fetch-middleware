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
