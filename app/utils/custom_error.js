'use strict';

class CustomError extends Error {
  constructor(message, errno) {
    super(message);
    this.errno = errno;
  }
}

module.exports = CustomError;
