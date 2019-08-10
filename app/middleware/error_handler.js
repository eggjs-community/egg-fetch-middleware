'use strict';

/**
 * 捕获系统异常的中间件
 *
 * * @return {Object} 固定格式的响应内容
 */
module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err.errno === undefined && ctx.app.config.env === 'local') {
        if (ctx.logger) {
          ctx.logger.error(err.message, err);
        } else {
          console.error(err);
          console.error(err.stack);
        }
      }
      if (ctx.acceptJSON) {
        ctx.body = ctx.serverError(err);
      } else {
        ctx.body = `<h1>${JSON.stringify(
          ctx.serverError(err),
          undefined,
          4
        )}</h1>`;
      }
    }
  };
};
