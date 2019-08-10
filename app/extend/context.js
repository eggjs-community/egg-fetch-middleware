'use strict';

const CustomError = require('../utils/custom_error');

const Code = {
  CONTINUE: 100, // 一切正常, 客户端应该继续请求
  OK: 200, // [GET] 服务器成功返回用户请求的数据
  CREATED: 201, // [POST/PUT/PATCH] 用户新建或修改数据成功
  ACCEPTED: 202, // 一个请求已经进入后台排队（异步任务）
  NO_CONTENT: 204, // [DELETE] 删除数据成功
  MULTIPLE_CHOICES: 300, // 重定向的响应状态码，表示该请求拥有多种可能的响应
  SEE_OTHER: 303, // [POST/PUT/DELETE] 暂时重定向，由客户端决定
  BAD_REQUEST: 400, // [POST/PUT/PATCH] 服务器不理解客户端的请求，未做任何处理
  UNAUTHORIZED: 401, // 用户未提供身份验证凭据，或者没有通过身份验证
  FORBIDDEN: 403, // 用户通过了身份验证，但是不具有访问资源所需的权限
  NOT_FOUND: 404, // 所请求的资源不存在或不可用
  NOT_ACCEPTABLE: 406, // [GET] 不支持用户请求的格式，如请求json，但只有xml
  GONE: 410, // [GET] 所请求的资源已被永久转移，不再可用
  UNPROCESABLE_ENTITY: 422, // [POST/PUT/PATCH] 客户端提交的表单验证失败
  INTERNAL_SERVER_ERROR: 500, // 服务端发生错误
  SERVICE_UNAVAILABLE: 503, // 服务暂时不可用
};

module.exports = {
  /**
   * 正常响应成功
   *
   * @param {*} [data={}] 响应数据
   * @param {*} [meta={}] 响应的元数据信息
   * @param {string} [message=''] 描述信息
   * @param {*} [code=Code.OK] 响应的状态码，参考 https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10 的 10.2 Successful 2xx
   * @return {Object} 固定格式的响应内容
   */
  ok(data = {}, meta = {}, message = '', code = Code.OK) {
    this.status = code;
    const result = {
      success: true,
      data,
      meta,
      message,
    };

    return result;
  },

  /**
 * 定义 error 结构，仅供内部使用
 *
 * @param {*} [code=Code.INTERNAL_SERVER_ERROR] 响应的状态码，参考 https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10 的 10.5 Server Error 5xx
 * @param {string} [message=''] 描述信息
 * @param {string} [stack=''] Error的堆栈信息
 * @param {*} [data={}] 响应数据
 * @param {*} [meta={}] 响应的元数据信息
 * * @return {Object} 固定格式的响应内容
 */
  error(
    code = Code.INTERNAL_SERVER_ERROR,
    message = '',
    stack = '',
    data = {},
    meta = {}
  ) {
    const result = {
      code,
      message,
      success: false,
    };

    this.status = typeof code === 'number' ? code : Code.INTERNAL_SERVER_ERROR;

    const env = this.app.config.env;
    const showStack = this.app.config.fetchMiddleware && this.app.config.fetchMiddleware.showStack;

    result.stack = stack;
    if (env !== 'local' && env !== 'unittest' || !showStack) {
      // 只在这2个环境给出更详细的错误
      result.stack = undefined;
    }

    if (data) {
      result.data = data;
    }

    if (meta) {
      result.meta = meta;
    }

    return result;
  },

  /**
 *  响应服务器错误，通常用于处理 https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10 的 10.5 Server Error 5xx
 *
 * @param {string} [error={ errno: Code.INTERNAL_SERVER_ERROR, message: '', stack: '', data: {}, meta: {} }] 服务器错误信息
 * * @return {Object} 固定格式的响应内容
 */
  serverError(error = { errno: Code.INTERNAL_SERVER_ERROR, message: '', stack: '', data: {}, meta: {} }) {
    return this.error(
      error.errno,
      error.message,
      error.stack,
      error.data,
      error.meta
    );
  },

  /**
   * 自定义错误，用于处理1xx、3xx、4xx系统异常和业务错误处理
   *
   * @param {*} [code=Code.NOT_FOUND]
   *   响应的状态码(参考 https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10 1xx、3xx、4xx)，按系统异常处理
  *    否则，返回200给前端，让业务系统按照业务系统错误处理
   * @param {string} [message=''] 描述信息
   * @param {*} [data={}] 响应数据
   * @param {*} [meta={}] 响应的元数据信息
   */
  throwError(
    code = Code.NOT_FOUND,
    message = '',
    data = {},
    meta = {}
  ) {
    let _code = code;
    // 当传入的code，非1xx、3xx、4xx 时，统一返回200，交给业务前端处理
    if (
      code < Code.CONTINUE ||
      code >= Code.OK && code < Code.MULTIPLE_CHOICES ||
      code >= Code.INTERNAL_SERVER_ERROR
    ) {
      _code = Code.OK;
    }

    const error = new CustomError(message, _code);
    const env = this.app.config.env;
    const showStack = this.app.config.fetchMiddleware && this.app.config.fetchMiddleware.showStack;

    if (env !== 'local' && env !== 'unittest' || !showStack) {
      // 只在这2个环境给出更详细的错误
      error.stack = undefined;
    }

    if (data) {
      error.data = data;
    }

    if (meta) {
      error.meta = meta;
    }

    throw error;
  },
};
