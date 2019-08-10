'use strict';

/**
 * egg-fetch-middleware default config
 * @member Config#fetchMiddleware
 * @property {String} SOME_KEY - some description
 */
exports.fetchMiddleware = {
  // local 和 unittest 环境强制开启，其他环境用该配置指定抛出错误时是否要有Error的错误栈信息
  showStack: false,
};
