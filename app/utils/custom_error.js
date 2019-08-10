'use strict';

class CustomError extends Error {
  constructor(message, errno) {
    super(message);
    this.errno = errno;
    this.message = message;
  }
}

module.exports = CustomError;
