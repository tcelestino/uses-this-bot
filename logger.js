'use strict';

const { createLogger, format, transports } = require('winston');

const { combine, json, timestamp } = format;

const logger = createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' }), json()),
  transports: [new transports.Console()],
});

module.exports = logger;
