'use strict';

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err.errno === undefined && ctx.app.config.env === 'local') {
        if (ctx.coreLogger) {
          ctx.coreLogger.error(err);
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
