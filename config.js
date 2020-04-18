'use strict';

require('dotenv').config();

module.exports = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  USES_THIS_JSON: process.env.USESTHIS_JSON,
  DOMAIN: process.env.DOMAIN,
  SERVER_PORT: process.env.SERVER_PORT,
  NODE_ENV: process.env.NODE_ENV,
};
