const winston = require('winston');
const Elasticsearch = require('winston-elasticsearch');

const esTransportOpts = {
  level: 'info',

};
const logger = winston.createLogger({
  transports: [new Elasticsearch(esTransportOpts)],
});

module.exports = logger;
