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
}

module.exports = HomeController;
