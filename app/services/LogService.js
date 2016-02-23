const winston = require('winston');

//
//  Requiring 'winston-papertrail' will expose 'winston.transports.Papertrail'
//
require('winston-papertrail').Papertrail; // eslint-disable-line no-unused-expressions

const Config = require('./ConfigurationService');

const logger = new winston.Logger();
const logHost = Config.get('LOG_HOST') || '0.0.0.0';
const logPort = Config.get('LOG_PORT') || 12345;

// Write logs to the console
logger.add(winston.transports.Console, {
  level: 'debug',
});

logger.add(winston.transports.Papertrail, {
  host: logHost,
  port: logPort,
});

if (!logHost) {
  logger.error('LOG_HOST for Papertrail is not defined');
}

if (!logPort) {
  logger.error('LOG_PORT for Papertrail is not defined');
}

module.exports = logger;
